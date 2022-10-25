using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Validators;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using FluentValidation.Results;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class StaticScanDetailService : IStaticScanDetailService
    {
        #region Variables

        private readonly ILogger _logger;
        private readonly IStaticScanDetailsRepository _staticScanDetailsRepository;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly IIdentityService _identityService;

        #endregion Variables

        #region Constructors

        public StaticScanDetailService(
            ILogger<StaticScanDetailService> logger,
            IStaticScanDetailsRepository staticScanDetailsRepository,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            IIdentityService identityService)
        {
            _staticScanDetailsRepository = staticScanDetailsRepository;
            _logger = logger;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _identityService = identityService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<int>> AddStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails)
        {
            StaticScanDetailsValidator staticScanDetailsValidator = new StaticScanDetailsValidator();
            ValidationResult validationResult = await staticScanDetailsValidator.ValidateAsync(staticScanDetails);

            if (!validationResult.IsValid)
            {
                return Result.Fail<int>(validationResult.ToString());
            }

            Result accessibilityResult = await ValidateProjectAccess(staticScanDetails.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            using (var transaction = _staticScanDetailsRepository.BeginTransaction())
            {
                try
                {
                    staticScanDetails.IsDeleted = false;

                    int staticScanDetailsId = await _staticScanDetailsRepository.AddStaticScanDetailsAsync(staticScanDetails);
                    if (staticScanDetailsId > 0)
                    {
                        staticScanDetails.StaticScanPreferences.ForEach(s =>
                        {
                            s.StaticScanDetailsId = staticScanDetailsId;
                        });

                        await _staticScanDetailsRepository.AddStaticScanTypesAsync(staticScanDetails.StaticScanPreferences);
                    }
                    await transaction.CommitAsync();

                    return Result.Ok(staticScanDetailsId);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, Messages.StaticScanDetailsSaveFailed);

                    return Result.Fail<int>(Messages.StaticScanDetailsSaveFailed);
                }
            }
        }

        public async Task<Result<int>> UpdateStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetailsDTO)
        {
            StaticScanDetailsValidator staticScanDetailsValidator = new StaticScanDetailsValidator();
            ValidationResult validationResult = await staticScanDetailsValidator.ValidateAsync(staticScanDetailsDTO);
            if (!validationResult.IsValid)
            {
                return Result.Fail<int>(validationResult.ToString());
            }

            StaticScanDetailsDTO staticScanDetails = _staticScanDetailsRepository.GetStaticScanDetailById(staticScanDetailsDTO.Id);
            if (staticScanDetails == null)
            {
                return Result.Fail<int>(Messages.StaticScanDetailNotFound);
            }

            Result accessibilityResult = await ValidateProjectAccess(staticScanDetailsDTO.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            using (var transaction = _staticScanDetailsRepository.BeginTransaction())
            {
                try
                {
                    staticScanDetails.ProjectId = staticScanDetailsDTO.ProjectId;
                    staticScanDetails.CodeOrCodeURL = staticScanDetailsDTO.CodeOrCodeURL;
                    staticScanDetails.UserName = staticScanDetailsDTO.UserName;
                    staticScanDetails.Password = staticScanDetailsDTO.Password;
                    staticScanDetails.SourceCodeType = staticScanDetailsDTO.SourceCodeType;
                    staticScanDetails.SourceControlType = staticScanDetailsDTO.SourceControlType;
                    staticScanDetails.IsDeleted = false;

                    await _staticScanDetailsRepository.UpdateStaticScanDetailsAsync(staticScanDetails);

                    staticScanDetailsDTO.StaticScanPreferences.ForEach(s =>
                    {
                        s.StaticScanDetailsId = staticScanDetails.Id;
                    });

                    await UpdateStaticScanPreferences(staticScanDetails.StaticScanPreferences, staticScanDetailsDTO.StaticScanPreferences);

                    await transaction.CommitAsync();

                    return Result.Ok(staticScanDetails.Id);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, Messages.StaticScanDetailsUpdateFailed);

                    return Result.Fail<int>(Messages.StaticScanDetailsUpdateFailed);
                }
            }
        }

        //public Result<StaticScanDetailsDTO> GetStaticScanDetailById(int id)
        //{
        //    return Result.Ok(_staticScanDetailsRepository.GetStaticScanDetailById(id));
        //}

        public async Task<Result<StaticScanDetailsDTO>> GetStaticScanDetailsByProjectIdAsync(int projectId, bool validateAccess = true)
        {
            if (validateAccess)
            {
                Result accessibilityResult = await ValidateProjectAccess(projectId);

                if (!accessibilityResult.IsSucceeded)
                {
                    return Result.Fail<StaticScanDetailsDTO>(accessibilityResult.GetErrorString());
                } 
            }

            var staticScanDetails = await _staticScanDetailsRepository.GetStaticScanDetailsByProjectIdAsync(projectId);

            if (staticScanDetails == null)
            {
                return Result.Fail<StaticScanDetailsDTO>(Messages.StaticScanDetailNotFound);
            }

            return Result.Ok(staticScanDetails);
        }

        public async Task<Result<bool>> DeleteStaticScanDetailsByIdAsync(int id)
        {
            StaticScanDetailsDTO staticScanDetails = _staticScanDetailsRepository.GetStaticScanDetailById(id);
            if (staticScanDetails == null || staticScanDetails.IsDeleted)
            {
                return Result.Fail<bool>(Messages.StaticScanDetailNotFound);
            }

            Result accessibilityResult = await ValidateProjectAccess(staticScanDetails.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<bool>(accessibilityResult.GetErrorString());
            }

            staticScanDetails.IsDeleted = true;

            await _staticScanDetailsRepository.UpdateStaticScanDetailsAsync(staticScanDetails);

            return Result.Ok(staticScanDetails.Id > 0);
        }

        public async Task<Result<List<ListItem<int>>>> GetProjectStaticScanUrlListAsync(List<int> projectIdList)
        {
            var result = await _staticScanDetailsRepository.GetProjectStaticScanUrlListAsync(projectIdList);
            return Result.Ok(result);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task UpdateStaticScanPreferences(List<StaticScanTypeDTO> staticScanType, List<StaticScanTypeDTO> staticScanTypeDTO)
        {
            if (staticScanType != null)
            {
                if (staticScanType.Count > staticScanTypeDTO.Count)
                {
                    foreach (StaticScanTypeDTO item in staticScanType)
                    {
                        if (!staticScanTypeDTO.Any(s => s.StaticScanTypeId == item.StaticScanTypeId))
                        {
                            item.IsDeleted = true;
                        }
                    }
                    await _staticScanDetailsRepository.UpdateStaticScanTypesAsync(staticScanType);
                }
                else if (staticScanType.Count < staticScanTypeDTO.Count)
                {
                    List<StaticScanTypeDTO> newScanTypes = new List<StaticScanTypeDTO>();

                    foreach (StaticScanTypeDTO item in staticScanTypeDTO)
                    {
                        if (!staticScanType.Any(s => s.StaticScanTypeId == item.StaticScanTypeId))
                        {
                            newScanTypes.Add(new StaticScanTypeDTO
                            {
                                StaticScanDetailsId = item.StaticScanDetailsId,
                                StaticScanTypeId = item.StaticScanTypeId,
                            });
                        }
                    }

                    await _staticScanDetailsRepository.AddStaticScanTypesAsync(newScanTypes);
                }
            }
        }

        private async Task<Result> ValidateProjectAccess(int projectId)
        {
            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(projectId);

            if (project == null)
            {
                return Result.Fail(Messages.ProjectDetailNotFound);
            }

            if (!_identityService.HasProjectAdminAccess(project.Id, project.ClientId.Value))
            {
                return Result.Fail(Messages.UnAuthorizedEntityAccess);
            }
            return Result.Ok();
        }

        #endregion Private Methods
    }
}