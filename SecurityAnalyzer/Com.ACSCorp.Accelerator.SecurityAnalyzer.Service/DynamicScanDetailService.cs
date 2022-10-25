using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service
{
    public class DynamicScanDetailService : IDynamicScanDetailService
    {
        #region Variables

        private readonly IIdentityService _identityService;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly IDynamicScanDetailsRepository _dynamicScanDetailsRepository;

        #endregion Variables

        #region Constructors

        public DynamicScanDetailService(
            IDynamicScanDetailsRepository dynamicScanDetailsRepository,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            IIdentityService identityService)
        {
            _dynamicScanDetailsRepository = dynamicScanDetailsRepository;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _identityService = identityService;
        }

        #endregion Constructors

        #region Public Methods

        /// <summary>
        /// Save project dynamic scan details
        /// </summary>
        /// <param name="dynamicScanDetails"></param>
        /// <returns></returns>
        public async Task<Result<int>> AddDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails)
        {
            dynamicScanDetails.IsDeleted = false;

            Result accessibilityResult = await ValidateProjectAccess(dynamicScanDetails.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            int scanId = await _dynamicScanDetailsRepository.AddDynamicScanDetailsAsync(dynamicScanDetails);
            if (scanId <= 0)
            {
                return Result.Fail<int>(Messages.AddDynamicScanDetailsFailMessage);
            }

            return Result.Ok(scanId);
        }

        /// <summary>
        /// Update project dynamic scan details
        /// </summary>
        /// <param name="dynamicScanDetails"></param>
        /// <returns></returns>
        public async Task<Result<bool>> UpdateDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails)
        {
            DynamicScanDetailsDTO existingDynamicScanDetailsDTO = await _dynamicScanDetailsRepository.GetDynamicScanDetailsByIdAsync(dynamicScanDetails.Id);

            if (existingDynamicScanDetailsDTO == null || existingDynamicScanDetailsDTO.IsDeleted)
            {
                return Result.Fail<bool>(Messages.DynamicScanDetailsNotFound);
            }

            Result accessibilityResult = await ValidateProjectAccess(existingDynamicScanDetailsDTO.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<bool>(accessibilityResult.GetErrorString());
            }

            existingDynamicScanDetailsDTO.ApplicationURL = dynamicScanDetails.ApplicationURL;
            existingDynamicScanDetailsDTO.UserName = dynamicScanDetails.UserName;
            existingDynamicScanDetailsDTO.Password = dynamicScanDetails.Password;
            existingDynamicScanDetailsDTO.IsDeleted = false;

            bool isSucceeded = await _dynamicScanDetailsRepository.UpdateDynamicScanDetailsAsync(existingDynamicScanDetailsDTO);

            return Result.Ok(isSucceeded);
        }

        /// <summary>
        /// Get list of Dynamic scan details based on project
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<Result<DynamicScanDetailsDTO>> GetDynamicScanDetailsAsync(int projectId)
        {
            Result accessibilityResult = await ValidateProjectAccess(projectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<DynamicScanDetailsDTO>(accessibilityResult.GetErrorString());
            }

            var result = await _dynamicScanDetailsRepository.GetDynamicScanDetailsByProjectIdAsync(projectId);
            return Result.Ok(result);
        }

        public async Task<Result<List<ListItem<int>>>> GetProjectDynamicScanUrlListAsync(List<int> projectIdList)
        {
            var result = await _dynamicScanDetailsRepository.GetProjectDynamicScanUrlListAsync(projectIdList);
            return Result.Ok(result);
        }

        /// <summary>
        /// DeleteDynamicScanDetailsByIdAsync
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Result<bool>> DeleteDynamicScanDetailsByIdAsync(int id)
        {
            DynamicScanDetailsDTO dynamicScanDetailsDTO = await _dynamicScanDetailsRepository.GetDynamicScanDetailsByIdAsync(id);

            if (dynamicScanDetailsDTO == null || dynamicScanDetailsDTO.IsDeleted)
            {
                return Result.Fail<bool>(Messages.DynamicScanDetailsNotFound);
            }

            Result accessibilityResult = await ValidateProjectAccess(dynamicScanDetailsDTO.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<bool>(accessibilityResult.GetErrorString());
            }

            dynamicScanDetailsDTO.IsDeleted = true;
            bool result = await _dynamicScanDetailsRepository.UpdateDynamicScanDetailsAsync(dynamicScanDetailsDTO);

            return Result.Ok(result);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result> ValidateProjectAccess(int projectId)
        {
            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(projectId);

            if (project == null || project.IsDeleted)
            {
                return Result.Fail(Messages.ProjectNotFound);
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
