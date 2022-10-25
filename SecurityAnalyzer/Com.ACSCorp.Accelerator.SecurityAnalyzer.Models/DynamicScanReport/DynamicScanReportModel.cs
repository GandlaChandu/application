using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class DynamicScanReportModel
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ClientName { get; set; }
        public string ScanDate { get; set; }
        public DynamicScanScopeDTO Scope { get; set; }
        public List<DynamicScanResultDTO> Issues { get; set; }
        public List<IssueSeverityGroup> SeverityGroupIssues { get; set; }
    }
}
