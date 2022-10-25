using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO;
using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.Mappers
{
    public static class StaticScanMapper
    {
        public static void UpdateIssueStatus(this IEnumerable<SonarIssueDTO> sonarIssues, IEnumerable<IssueStatusDTO> issueStatuses)
        {
            if (sonarIssues != null && sonarIssues.Any())
            {
                foreach (var issue in sonarIssues)
                {
                    IssueStatusDTO issueStatus = issueStatuses.FirstOrDefault(s => s.ScanIssueId == issue.Key);
                    if (issueStatus != null)
                    {
                        issue.TicketSystemStatus = issueStatus;
                    }
                }
            }
        }
    }
}
