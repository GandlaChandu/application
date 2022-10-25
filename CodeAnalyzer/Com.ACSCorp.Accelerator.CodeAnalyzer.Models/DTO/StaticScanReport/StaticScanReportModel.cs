using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class StaticScanReportModel
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ClientName { get; set; }
        public string ScanDate { get; set; }
        public StaticScanReportScopeModel Scope { get; set; }
        public StaticScanOverviewDTO CodeCoverage { get; set; }
        public List<SonarIssueDTO> Issues { get; set; }
        public List<SeverityGroupIssue> SeverityGroupIssues { get; set; }
    }
}
