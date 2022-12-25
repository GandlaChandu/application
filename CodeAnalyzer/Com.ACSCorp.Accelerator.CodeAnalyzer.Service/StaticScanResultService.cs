using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO.Issue;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.Enums;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Service.Mappers;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Interfaces;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class StaticScanResultService : IStaticScanResultService
    {
        #region Variables

        private readonly IStaticScanRepository _staticScanRepository;
        private readonly IStaticScanDetailService _staticScanDetailService;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly ISonarQubeClient _sonarQubeClient;
        private readonly ITicketSystemClient _ticketSystemClient;
        private readonly IIdentityService _identityService;

        #endregion Variables

        #region Constructors

        public StaticScanResultService(
           IStaticScanRepository staticScanRepository,
           IStaticScanDetailService staticScanDetailService,
           ISonarQubeClient sonarQubeClient,
           IApplicationAnalyzerClient applicationAnalyzerClient,
           ITicketSystemClient ticketSystemClient,
           IIdentityService identityService
            )
        {
            _staticScanRepository = staticScanRepository;
            _staticScanDetailService = staticScanDetailService;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _sonarQubeClient = sonarQubeClient;
            _ticketSystemClient = ticketSystemClient;
            _identityService = identityService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<ListResult<SonarIssueDTO>>> GetStaticScanResultsAsync(int scanId, Pagination pagination = null)
        {
            Result<ProjectDTO> projectResult = await GetProjectByScanIdAsync(scanId);

            if (!projectResult.IsSucceeded)
            {
                return Result.Fail<ListResult<SonarIssueDTO>>(projectResult.GetErrorString());
            }

            Result<StaticScanDetailsDTO> staticScanDetailsResult = await GetStaticScanDetailsAsync(projectResult.Value.Id);

            if (!staticScanDetailsResult.IsSucceeded)
            {
                return Result.Fail<ListResult<SonarIssueDTO>>(staticScanDetailsResult.GetErrorString());
            }

            IssueListParametersDTO sonarQubeParameters = BuildIssueListParameters(projectResult.Value.Key, staticScanDetailsResult.Value.StaticScanPreferences);

            var result = await _sonarQubeClient.GetScanResultAsync(sonarQubeParameters, pagination);

            if (!result.IsSucceeded)
            {
                return Result.Fail<ListResult<SonarIssueDTO>>(result.GetErrorString());
            }

            var issuesStatusRequest = new IssuesStatusRequestDTO
            {
                IssueIds = result.Value.Items.Select(s => s.Key),
                ScanId = scanId,
                ScanType = Convert.ToInt32(ScanType.Static)
            };

            Result<List<IssueStatusDTO>> issueStatusesResult = await _ticketSystemClient.GetIssuesStatus(projectResult.Value.Id, issuesStatusRequest);
            if (issueStatusesResult.IsSucceeded)
            {
                result.Value.Items.UpdateIssueStatus(issueStatusesResult.Value);
            }

            return result;
        }

        public async Task<Result<List<SonarIssueDTO>>> GetScanResultsByProjectAndStaticScanDtails(ProjectDTO project, StaticScanDetailsDTO staticScanDetails)
        {
            IssueListParametersDTO sonarQubeparameters = BuildIssueListParameters(project.Key, staticScanDetails.StaticScanPreferences);
            var result = await _sonarQubeClient.GetScanResultByScanIdAsync(sonarQubeparameters);

            return result;
        }

        public async Task<Result<List<SonarIssueDTO>>> GetScanResultsBySonarProjectKey(string sonarProjectKey)
        {
            return await _sonarQubeClient.GetScanResult(sonarProjectKey, $"{SonarIssueTypeConstants.IssueTypeBug},{SonarIssueTypeConstants.IssueTypeCodeSmell},{SonarIssueTypeConstants.IssueTypeVulnerability}");
        }

        public async Task<Result<StaticScanOverviewDTO>> GetStaticScanOverviewAsync(int scanId)
        {
            Result<ProjectDTO> projectResult = await GetProjectByScanIdAsync(scanId);

            if (!projectResult.IsSucceeded)
            {
                return Result.Fail<StaticScanOverviewDTO>(projectResult.GetErrorString());
            }

            Result<StaticScanDetailsDTO> staticScanDetailsResult = await GetStaticScanDetailsAsync(projectResult.Value.Id);

            if (!staticScanDetailsResult.IsSucceeded)
            {
                return Result.Fail<StaticScanOverviewDTO>(staticScanDetailsResult.GetErrorString());
            }

            StaticScanTypeDTO codeCoverageScanType = staticScanDetailsResult.Value.StaticScanPreferences
                .FirstOrDefault(c => c.StaticScanTypeId == (short)StaticScanType.CodeCoverage);

            if (codeCoverageScanType == null)
            {
                return Result.Ok(new StaticScanOverviewDTO());
            }

            Result<StaticScanOverviewDTO> overviewResult = await _sonarQubeClient.GetScanOverviewAsync(projectResult.Value.Key);

            return overviewResult;
        }

        public async Task<Result<StaticScanOverviewDTO>> GetStaticScanOverviewAsync(string projectKey)
        {
            Result<StaticScanOverviewDTO> overviewResult = await _sonarQubeClient.GetScanOverviewAsync(projectKey);

            return overviewResult;
        }

        #endregion Public Methods

        #region Private Methods

        private IssueListParametersDTO BuildIssueListParameters(Guid projectKey, List<StaticScanTypeDTO> staticScanTypes)
        {
            List<string> issueTypes = GetIssueTypes(staticScanTypes);

            var sonarQubeparameters = new IssueListParametersDTO
            {
                ProjectKey = projectKey,
                Types = string.Join(",", issueTypes),
                //CreatedAfter = GetDateInSonarQubeFormat(staticScan.CreatedOn),
                //CreatedBefore = GetDateInSonarQubeFormat(staticScan.ModifiedOn ?? DateTime.UtcNow)
            };

            return sonarQubeparameters;
        }

        private List<string> GetIssueTypes(List<StaticScanTypeDTO> staticScanTypes)
        {
            List<string> issueTypes = new List<string>();

            // Include BUG and CODE_SMELL issues when CodingStandards is present
            StaticScanTypeDTO codingStandardsScanType = staticScanTypes.FirstOrDefault(c => c.StaticScanTypeId == (short)StaticScanType.CodingStandards);
            if (codingStandardsScanType != null)
            {
                issueTypes.Add(SonarIssueTypeConstants.IssueTypeBug);
                issueTypes.Add(SonarIssueTypeConstants.IssueTypeCodeSmell);
            }

            // Include VULNERABILITY issues when SecurityChecks is present
            StaticScanTypeDTO securityScanType = staticScanTypes.FirstOrDefault(c => c.StaticScanTypeId == (short)StaticScanType.SecurityChecks);
            if (securityScanType != null)
            {
                issueTypes.Add(SonarIssueTypeConstants.IssueTypeVulnerability);
            }

            return issueTypes;
        }

        private async Task<Result<ProjectDTO>> GetProjectByScanIdAsync(int scanId, bool verifyProjectAccess = true)
        {
            StaticScanDTO staticScan = await _staticScanRepository.GetStaticScanAsync(scanId);
            if (staticScan == null)
            {
                return Result.Fail<ProjectDTO>(Messages.StaticScanDetailNotFound);
            }

            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(staticScan.ProjectId);
            if (project == null)
            {
                return Result.Fail<ProjectDTO>(Messages.ProjectDetailNotFound);
            }

            if (verifyProjectAccess)
            {
                if (!_identityService.HasProjectAccess(project.Id, project.ClientId.Value))
                {
                    return Result.Fail<ProjectDTO>(Messages.UnAuthorizedEntityAccess);
                }
            }

            return Result.Ok(project);
        }

        private async Task<Result<StaticScanDetailsDTO>> GetStaticScanDetailsAsync(int projectId)
        {
            Result<StaticScanDetailsDTO> staticScanDetailsResult = await _staticScanDetailService.GetStaticScanDetailsByProjectIdAsync(projectId, false);

            if (!staticScanDetailsResult.IsSucceeded)
            {
                return staticScanDetailsResult;
            }

            StaticScanDetailsDTO staticScanDetails = staticScanDetailsResult.Value;

            // If project is not configured for static scan then return a message
            if (staticScanDetails.StaticScanPreferences == null || staticScanDetails.StaticScanPreferences.Count == 0)
            {
                return Result.Fail<StaticScanDetailsDTO>(Messages.ProjectNotConfiguredForStaticScan);
            }

            return Result.Ok(staticScanDetails);
        }

        //private string GetDateInSonarQubeFormat(DateTime date)
        //{
        //    string offset = $"{date:zzz}".Replace(":", "");
        //    return $"{ date:yyyy-MM-dd'T'HH:mm:ss}{offset}";
        //}

        #endregion Private Methods
    }
}
