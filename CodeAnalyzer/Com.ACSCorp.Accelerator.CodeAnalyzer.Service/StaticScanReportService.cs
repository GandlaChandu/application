using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Factory;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Interfaces;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Models;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class StaticScanReportService : IStaticScanReportService
    {
        #region Variables

        private readonly IIdentityService _identityService;
        private readonly IStaticScanRepository _staticScanRepository;
        private readonly IStaticScanResultService _staticScanResultService;
        private readonly IStaticScanDetailService _staticScanDetailService;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;

        #endregion Variables

        #region Constructors

        public StaticScanReportService(
            IIdentityService identityService,
            IStaticScanRepository staticScanRepository,
            IStaticScanResultService staticScanResultService,
            IStaticScanDetailService staticScanDetailService,
            IApplicationAnalyzerClient applicationAnalyzerClient)
        {
            _identityService = identityService;
            _staticScanRepository = staticScanRepository;
            _staticScanResultService = staticScanResultService;
            _staticScanDetailService = staticScanDetailService;
            _applicationAnalyzerClient = applicationAnalyzerClient;
        }

        #endregion Constructor

        #region Public Methods

        public async Task<Result<Report>> GenerateReportAsync(int id, ReportFormat reportFormat = ReportFormat.Excel, bool verifyAccess = true)
        {
            Result<StaticScanReportModel> reportResult = await GetStaticScanReportDataAsync(id, verifyAccess);

            if (!reportResult.IsSucceeded)
            {
                return Result.Fail<Report>(reportResult.GetErrorString());
            }

            if (reportFormat == ReportFormat.Excel)
            {
                var overviewResult = await _staticScanResultService.GetStaticScanOverviewAsync(id);
                if (overviewResult.IsSucceeded)
                {
                    reportResult.Value.CodeCoverage = overviewResult.Value;
                }
            }

            var staticScanReportFactory = new StaticScanReportFactory();

            IStaticScanReport staticScanReport = staticScanReportFactory.GetReport(reportFormat);
            Report report = staticScanReport.Generate(reportResult.Value);

            return Result.Ok(report);
        }

        public async Task<Result<Report>> GenerateReportAsync(string projectKey, ReportFormat reportFormat = ReportFormat.Excel)
        {
            Result<StaticScanReportModel> reportResult = await GetStaticScanReportDataAsync(projectKey);

            if (!reportResult.IsSucceeded)
            {
                return Result.Fail<Report>(reportResult.GetErrorString());
            }

            if (reportFormat == ReportFormat.Excel)
            {
                var overviewResult = await _staticScanResultService.GetStaticScanOverviewAsync(projectKey);
                if (overviewResult.IsSucceeded)
                {
                    reportResult.Value.CodeCoverage = overviewResult.Value;
                }
            }

            var staticScanReportFactory = new StaticScanReportFactory();

            IStaticScanReport staticScanReport = staticScanReportFactory.GetReport(reportFormat);
            Report report = staticScanReport.Generate(reportResult.Value);

            return Result.Ok(report);
        }

        #endregion Public Methods

        #region Private Methods

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

        private async Task<Result<StaticScanReportModel>> GetStaticScanReportDataAsync(int scanId, bool verifyAccess)
        {
            Result<ProjectDTO> projectResult = await GetProjectByScanIdAsync(scanId, verifyAccess);

            if (!projectResult.IsSucceeded)
            {
                return Result.Fail<StaticScanReportModel>(projectResult.GetErrorString());
            }

            Result<StaticScanDetailsDTO> staticScanDetailsResult = await GetStaticScanDetailsAsync(projectResult.Value.Id);

            if (!staticScanDetailsResult.IsSucceeded)
            {
                return Result.Fail<StaticScanReportModel>(staticScanDetailsResult.GetErrorString());
            }

            Result<List<SonarIssueDTO>> staticScanIssuesResult = await _staticScanResultService.GetScanResultsByProjectAndStaticScanDtails(projectResult.Value, staticScanDetailsResult.Value);

            List<CweInfoDTO> cweInfo = await BuildCweInfoListAsync(staticScanIssuesResult.Value);

            StaticScanDTO staticScan = await _staticScanRepository.GetStaticScanAsync(scanId);

            if (staticScan == null)
            {
                return Result.Fail<StaticScanReportModel>(Messages.StaticScanDetailNotFound);
            }

            var staticScanReportModel = new StaticScanReportModel
            {
                ProjectId = projectResult.Value.Id,
                ProjectName = projectResult.Value.Name,
                ClientName = projectResult.Value.ClientName,
                ScanDate = staticScan.CreatedOn.ToString(),
                Scope = BuildStaticScanScope(staticScan),
                Issues = staticScanIssuesResult.Value,
                SeverityGroupIssues = BuildSeverityGroupIssues(staticScanIssuesResult.Value, cweInfo)
            };

            return Result.Ok(staticScanReportModel);
        }

        private async Task<Result<StaticScanReportModel>> GetStaticScanReportDataAsync(string projectKey)
        {
            Result<List<SonarIssueDTO>> staticScanIssuesResult = await _staticScanResultService.GetScanResultsBySonarProjectKey(projectKey);

            List<CweInfoDTO> cweInfo = await BuildCweInfoListAsync(staticScanIssuesResult.Value);

            var staticScanReportModel = new StaticScanReportModel
            {
                ProjectName = projectKey,
                Scope = new StaticScanReportScopeModel(),
                Issues = staticScanIssuesResult.Value,
                SeverityGroupIssues = BuildSeverityGroupIssues(staticScanIssuesResult.Value, cweInfo)
            };

            return Result.Ok(staticScanReportModel);
        }

        private async Task<List<CweInfoDTO>> BuildCweInfoListAsync(List<SonarIssueDTO> issues)
        {
            var cweInfoList = await _applicationAnalyzerClient.GetCweInfoByIdsAsync(issues.Select(c => c.CweId).Distinct());

            // Adding CweInfo item for CweId=0 as Code Smell
            cweInfoList.Add(new CweInfoDTO
            {
                CweId = 0,
                Name = "Code Quality"
            });

            return cweInfoList;
        }

        private List<SeverityGroupIssue> BuildSeverityGroupIssues(List<SonarIssueDTO> issues, List<CweInfoDTO> cweInfo)
        {
            var severityGroups = issues.GroupBy(c => c.Severity).Select(c => new SeverityGroupIssue
            {
                Severity = c.Key,
                IssueCount = c.Count(),
                CweList = BuildCweList(cweInfo, c.ToList())
            }).ToList();

            return severityGroups;
        }

        private StaticScanReportScopeModel BuildStaticScanScope(StaticScanDTO staticScan)
        {
            return new StaticScanReportScopeModel
            {
                Url = staticScan.Url,
                Username = staticScan.Username,
                StartTime = staticScan.StartTime,
                EndTime = staticScan.EndTime,
                ScanDuration = staticScan.EndTime - staticScan.StartTime
            };
        }

        private List<CweInfoGroupModel> BuildCweList(List<CweInfoDTO> cweInfo, List<SonarIssueDTO> issues)
        {
            var cweInfoModelList = new List<CweInfoGroupModel>();

            var cweIds = issues.GroupBy(c => c.CweId).Select(c => c.Key);

            foreach (var cweId in cweIds)
            {
                var cwe = cweInfo.FirstOrDefault(c => c.CweId == cweId);
                if (cwe != null)
                {
                    cweInfoModelList.Add(new CweInfoGroupModel
                    {
                        Id = cwe.Id,
                        Category = cwe.Category,
                        CweId = cwe.CweId,
                        Description = cwe.Description,
                        Name = cwe.Name,
                        Recommendation = cwe.Recommendation,
                        Issues = issues.Where(c => c.CweId == cwe.CweId).ToList()
                    });
                }
            }

            return cweInfoModelList;
        }

        #endregion Private Methods
    }
}