namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO
{
    public class DynamicScanResultDTO : AlertDTO
    {
        public int DynamicScanId { get; set; }
        public string RiskLevel { get; set; }
        public string ConfidenceLevel { get; set; }
        public int? ProjectId { get; set; }
        public IssueStatusDTO IssueStatus { get; set; }
    }
}
