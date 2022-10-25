using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Service.Mapper;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service
{
    public class DynamicScanResultService : IDynamicScanResultService
    {
        #region Variables

        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly ITicketSystemClient _ticketSystemClient;
        private readonly IDynamicScanResultRepository _dynamicScanResultRepository;
        private readonly IDynamicScanRepository _dynamicScanRepository;
        private readonly IIdentityService _identityService;

        #endregion Variables

        #region Constructors

        public DynamicScanResultService(
            IDynamicScanResultRepository dynamicScanResultRepository,
            IDynamicScanRepository dynamicScanRepository,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            ITicketSystemClient ticketSystemClient,
            IIdentityService identityService)
        {
            _dynamicScanResultRepository = dynamicScanResultRepository;
            _dynamicScanRepository = dynamicScanRepository;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _ticketSystemClient = ticketSystemClient;
            _identityService = identityService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<bool> SaveDynamicScanResultAsync(List<DynamicScanResultDTO> results)
        {
            return await _dynamicScanResultRepository.SaveDynamicScanResultAsync(results);
        }

        public async Task<Result<ListResult<DynamicScanResultDTO>>> GetDynamicScanResultsAsync(int scanId, ListParameter searchParameter = null)
        {
            var scanDetails = await _dynamicScanRepository.GetDynamicScanByIdAsync(scanId);

            if (scanDetails == null)
            {
                return Result.Fail<ListResult<DynamicScanResultDTO>>(Messages.DynamicScanNotFound);
            }

            var project = await _applicationAnalyzerClient.GetProjectByIdAsync(scanDetails.ProjectId);

            if (project == null || project.IsDeleted)
            {
                return Result.Fail<ListResult<DynamicScanResultDTO>>(Messages.ProjectNotFound);
            }

            if (!_identityService.HasProjectAccess(scanDetails.ProjectId, project.ClientId.Value))
            {
                return Result.Fail<ListResult<DynamicScanResultDTO>>(Messages.UnAuthorizedEntityAccess);
            }

            var result = await _dynamicScanResultRepository.GetDynamicScanResultsAsync(scanId, searchParameter);

            IssuesStatusRequestDTO issuesStatusRequest = new IssuesStatusRequestDTO
            {
                IssueIds = result.Items.Select(s => s.Id.ToString()),
                ScanId = scanId,
                ScanType = (int)ScanType.Dynamic
            };
            var issueStatusesResult = await _ticketSystemClient.GetIssuesStatus(scanDetails.ProjectId, issuesStatusRequest);

            if (issueStatusesResult.IsSucceeded)
            {
                result.Items.UpdateIssueStatus(issueStatusesResult.Value);
            }

            return Result.Ok(result);
        }

        public async Task<Result<List<DynamicScanResultDTO>>> GetDynamicScanResultsByScanIdAsync(int scanId)
        {
            List<DynamicScanResultDTO> dynamicScanResults = await _dynamicScanResultRepository.GetDynamicScanResultsByScanIdAsync(scanId);

            return Result.Ok(dynamicScanResults);
        }

        #endregion Public Methods
    }
}