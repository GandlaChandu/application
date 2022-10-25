using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Factory;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Interfaces;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service
{
    public class DynamicScanReportService : IDynamicScanReportService
    {
        #region Variables

        private readonly ILogger _logger;
        private readonly IIdentityService _identityService;
        private readonly IDynamicScanRepository _dynamicScanRepository;
        private readonly IDynamicScanDetailsRepository _dynamicScanDetailsRepository;
        private readonly IDynamicScanResultService _dynamicScanResultService;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;

        #endregion Variables

        #region Constructors

        public DynamicScanReportService(
            ILogger<DynamicScanReportService> logger,
            IIdentityService identityService,
            IDynamicScanRepository dynamicScanRepository,
            IDynamicScanDetailsRepository dynamicScanDetailsRepository,
            IDynamicScanResultService dynamicScanResultService,
            IApplicationAnalyzerClient applicationAnalyzerClient)
        {
            _logger = logger;
            _identityService = identityService;
            _dynamicScanRepository = dynamicScanRepository;
            _dynamicScanDetailsRepository = dynamicScanDetailsRepository;
            _dynamicScanResultService = dynamicScanResultService;
            _applicationAnalyzerClient = applicationAnalyzerClient;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<Report>> GenerateReportAsync(int scanId, ReportFormat reportFormat = ReportFormat.Excel, bool verifyAccess = true)
        {
            Result<DynamicScanReportModel> dynamicScanReportResult = await GetDynamicScanReportDataAsync(scanId, verifyAccess);

            if (!dynamicScanReportResult.IsSucceeded)
            {
                return Result.Fail<Report>(dynamicScanReportResult.GetErrorString());
            }

            var dynamicScanReportFactory = new DynamicScanReportFactory();
            IDynamicScanReport dynamicScanReport = dynamicScanReportFactory.GetReport(reportFormat);
            Report report = dynamicScanReport.Export(dynamicScanReportResult.Value);

            return Result.Ok(report);
        }

        #endregion

        #region Private Methods

        private async Task<Result<DynamicScanReportModel>> GetDynamicScanReportDataAsync(int dynamicScanId, bool verifyAccess = true)
        {
            DynamicScanDTO dynamicScan = await _dynamicScanRepository.GetDynamicScanByIdAsync(dynamicScanId);
            if (dynamicScan == null)
            {
                return Result.Fail<DynamicScanReportModel>(Messages.DynamicScanNotFound);
            }

            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(dynamicScan.ProjectId);
            if (project == null)
            {
                return Result.Fail<DynamicScanReportModel>(Messages.ProjectNotFound);
            }

            if (verifyAccess)
            {
                if (!_identityService.HasProjectAccess(project.Id, project.ClientId.Value))
                {
                    return Result.Fail<DynamicScanReportModel>(Messages.UnAuthorizedEntityAccess);
                }
            }

            var dynamicScanResults = await _dynamicScanResultService.GetDynamicScanResultsByScanIdAsync(dynamicScanId);
            if (!dynamicScanResults.IsSucceeded)
            {
                return Result.Fail<DynamicScanReportModel>(dynamicScanResults.GetErrorString());
            }

            var scopeDetails = await GetDynamicScanScopeDetailsAsync(dynamicScan);
            if (!scopeDetails.IsSucceeded)
            {
                return Result.Fail<DynamicScanReportModel>(scopeDetails.GetErrorString());
            }

            if (dynamicScanResults.Value == null || dynamicScanResults.Value.Count == 0 || scopeDetails.Value == null)
            {
                _logger.LogInformation($"{Messages.DynamicScanResultsNotFound}{dynamicScanId.ToString()}");
                return Result.Fail<DynamicScanReportModel>($"{Messages.DynamicScanResultsNotFound}{dynamicScanId.ToString()}");
            }

            List<CweInfoDTO> cweInfo = await BuildCweInfoListAsync(dynamicScanResults.Value);

            var dynamicScanReportModel = new DynamicScanReportModel
            {
                ProjectId = project.Id,
                ProjectName = project.Name,
                ClientName = project.ClientName,
                ScanDate = dynamicScan.CreatedOn.ToString(),
                Scope = scopeDetails.Value,
                Issues = dynamicScanResults.Value,
                SeverityGroupIssues = BuildIssueSeverityGroups(dynamicScanResults.Value, cweInfo)
            };

            return Result.Ok(dynamicScanReportModel);
        }

        private async Task<Result<DynamicScanScopeDTO>> GetDynamicScanScopeDetailsAsync(DynamicScanDTO dynamicScanDTO)
        {
            DynamicScanScopeDTO dynamicScanScopeDTO = BuildDynamicScanScopeDTO(dynamicScanDTO);
            if (dynamicScanScopeDTO == null)
            {
                return Result.Fail<DynamicScanScopeDTO>(Messages.DynamicScanNotFound);
            }

            DynamicScanDetailsDTO dynamicScanDetailsDTO = await _dynamicScanDetailsRepository.GetDynamicScanDetailsByProjectIdAsync(dynamicScanDTO.ProjectId);
            if (dynamicScanDetailsDTO == null)
            {
                return Result.Fail<DynamicScanScopeDTO>(Messages.DynamicScanDetailsNotFound);
            }

            dynamicScanScopeDTO.LoginUserId = dynamicScanDetailsDTO.UserName;

            return Result.Ok(dynamicScanScopeDTO);
        }

        public static DynamicScanScopeDTO BuildDynamicScanScopeDTO(DynamicScanDTO dynamicScanDTO)
        {
            if (dynamicScanDTO == null)
            {
                return null;
            }

            var dynamicScanScopeDTO = new DynamicScanScopeDTO
            {
                TargetURL = dynamicScanDTO.Url,
                LinksCrawled = dynamicScanDTO.UrlCount,
                StartDate = dynamicScanDTO.ScanStartTime,
                EndDate = dynamicScanDTO.ScanEndTime,
                ScanDuration = dynamicScanDTO.ScanStartTime.HasValue && dynamicScanDTO.ScanEndTime.HasValue ? (int)(dynamicScanDTO.ScanEndTime - dynamicScanDTO.ScanStartTime).Value.TotalMinutes : 0,
                ScanWindow = dynamicScanDTO.ScanStartTime.HasValue && dynamicScanDTO.ScanEndTime.HasValue ? Convert.ToString(dynamicScanDTO.ScanStartTime) + " - " + Convert.ToString(dynamicScanDTO.ScanEndTime) : string.Empty,
            };

            return dynamicScanScopeDTO;
        }

        private async Task<List<CweInfoDTO>> BuildCweInfoListAsync(List<DynamicScanResultDTO> issues)
        {
            var cweInfoList = await _applicationAnalyzerClient.GetCweInfoByIdsAsync(issues.Select(c => c.CWEId).Distinct());

            return cweInfoList;
        }

        private List<IssueSeverityGroup> BuildIssueSeverityGroups(List<DynamicScanResultDTO> issues, List<CweInfoDTO> cweInfo)
        {
            var severityGroups = issues.GroupBy(c => c.RiskLevel).Select(c => new IssueSeverityGroup
            {
                Severity = c.Key,
                IssueCount = c.Count(),
                CweList = BuildCweList(cweInfo, c.ToList())
            }).ToList();

            return severityGroups;
        }

        private List<CweInfoGroupModel> BuildCweList(List<CweInfoDTO> cweInfo, List<DynamicScanResultDTO> issues)
        {
            var cweInfoModelList = new List<CweInfoGroupModel>();

            var cweIds = issues.GroupBy(c => c.CWEId).Select(c => c.Key);

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
                        Issues = issues.Where(c => c.CWEId == cwe.CweId).ToList()
                    });
                }
            }

            return cweInfoModelList;
        }

        #endregion
    }
}
