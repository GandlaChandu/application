using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service.Mapper
{
    public static class DynamicScanResultMapper
    {
        public static List<DynamicScanResultDTO> ToDynamicScanResultDTOList(this List<Alert> alerts, DynamicScanRequestDTO request, int scanId)
        {
            var dynamicScanResults = new List<DynamicScanResultDTO>();
            foreach (var result in alerts)
            {
                dynamicScanResults.Add(result.ToDynamicScanResultDTO(request, scanId));
            }
            return dynamicScanResults;
        }

        public static DynamicScanResultDTO ToDynamicScanResultDTO(this Alert alert, DynamicScanRequestDTO request, int scanId)
        {
            var dynamicScanResult = new DynamicScanResultDTO
            {
                AlertMessage = alert.AlertMessage,
                Risk = alert.Risk,
                Confidence = alert.Confidence,
                Url = alert.Url,
                Other = alert.Other,
                Parameter = alert.Parameter,
                Attack = alert.Attack,
                Evidence = alert.Evidence,
                Description = alert.Description,
                Reference = alert.Reference,
                Solution = alert.Solution,
                CWEId = alert.CWEId,
                WASCId = alert.WASCId,
                DynamicScanId = scanId,
                CreatedById = request.UserId
            };

            return dynamicScanResult;
        }

        public static void UpdateIssueStatus(this IEnumerable<DynamicScanResultDTO> sonarIssues, IEnumerable<IssueStatusDTO> issueStatuses)
        {
            if (sonarIssues != null && sonarIssues.Any())
            {
                foreach (var issue in sonarIssues)
                {
                    IssueStatusDTO issueStatus = issueStatuses.FirstOrDefault(s => s.ScanIssueId == issue.Id.ToString());
                    if (issueStatus != null)
                    {
                        issue.IssueStatus = issueStatus;
                    }
                }
            }
        }
    }
}
