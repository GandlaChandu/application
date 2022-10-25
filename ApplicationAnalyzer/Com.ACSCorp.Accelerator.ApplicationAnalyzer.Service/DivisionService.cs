using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using FluentValidation.Results;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class DivisionService : IDivisionService
    {
        #region Variables

        private readonly IDivisionRepository _divisionRepository;
        private readonly IIdentityService _identityService;

        #endregion Variables

        #region Constructors

        public DivisionService(
            IDivisionRepository divisionRepository,
            IIdentityService identityService)
        {
            _divisionRepository = divisionRepository;
            _identityService = identityService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<ListResult<DivisionDTO>>> GetAllAsync(int clientId, ListParameter listParameter)
        {
            if (!_identityService.HasClientAdminAccess(clientId))
            {
                return Result.Fail<ListResult<DivisionDTO>>(Messages.UnAuthorizedEntityAccess);
            }

            ListResult<DivisionDTO> result = await _divisionRepository.GetAllDivisionsAsync(clientId, listParameter);
            return Result.Ok(result);
        }

        public async Task<Result<List<IdNamePair>>> GetAllActiveAsync(int clientId)
        {
            List<int> accessibleProjects = _identityService.GetAccessibleProjects();
            List<IdNamePair> result = await _divisionRepository.GetAllActiveDivisionsAsync(clientId, accessibleProjects);

            return Result.Ok(result);
        }

        public async Task<Result<DivisionDTO>> GetByIdAsync(int divisionId)
        {
            DivisionDTO division = await _divisionRepository.GetByIdAsync(divisionId);

            if (division == null || division.IsDeleted)
            {
                return Result.Fail<DivisionDTO>(Messages.DivisionNotFound);
            }

            if (!_identityService.HasClientAdminAccess(division.ClientId))
            {
                return Result.Fail<DivisionDTO>(Messages.UnAuthorizedEntityAccess);
            }

            return Result.Ok(division);
        }

        public async Task<Result<int>> AddDivisionAsync(DivisionDTO divisionDTO)
        {
            Result validationResult = await ValidateDivisionAsync(divisionDTO);
            if (!validationResult.IsSucceeded)
            {
                return Result.Fail<int>(validationResult.GetErrorString());
            }

            if (!_identityService.HasClientAdminAccess(divisionDTO.ClientId))
            {
                return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            }

            DivisionDTO existingDivision = await _divisionRepository.GetDivisionByNameAndClientIdAsync(divisionDTO.Name, divisionDTO.ClientId);
            if (existingDivision != null)
            {
                return Result.Fail<int>(Messages.DivisionExistWithGivenName);
            }

            divisionDTO.IsDeleted = false;

            var result = await _divisionRepository.AddDivisionAsync(divisionDTO);
            return Result.Ok(result);
        }

        public async Task<Result<int>> UpdateDivisionAsync(DivisionDTO divisionDTO)
        {
            Result validationResult = await ValidateDivisionAsync(divisionDTO);
            if (!validationResult.IsSucceeded)
            {
                return Result.Fail<int>(validationResult.GetErrorString());
            }

            if (!_identityService.HasClientAdminAccess(divisionDTO.ClientId))
            {
                return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            }

            var division = await _divisionRepository.GetByIdAsync(divisionDTO.Id);
            if (division == null || division.IsDeleted)
            {
                return Result.Fail<int>(Messages.DivisionNotFound);
            }

            DivisionDTO existingDivision = await _divisionRepository.GetDivisionByNameAndClientIdAsync(divisionDTO.Name, divisionDTO.ClientId);
            if (existingDivision != null && existingDivision.Id != division.Id)
            {
                return Result.Fail<int>(Messages.DivisionExistWithGivenName);
            }

            division.Name = divisionDTO.Name;
            division.IsActive = divisionDTO.IsActive;

            int divisionId = await _divisionRepository.UpdateDivisionAsync(division);
            return Result.Ok(divisionId);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result> ValidateDivisionAsync(DivisionDTO divisionDTO)
        {
            var divisionValidator = new DivisionValidator();
            ValidationResult validationResult = await divisionValidator.ValidateAsync(divisionDTO);

            if (!validationResult.IsValid)
            {
                return Result.Fail(validationResult.ToString());
            }

            return Result.Ok();
        }

        #endregion Private Methods
    }
}
