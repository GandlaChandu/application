using System;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class DynamicScanScopeDTO
    {
        public string TargetURL { get; set; }
        public int LinksCrawled { get; set; }
        public string LoginUserId { get; set; }
        public int? ScanDuration { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string ScanWindow { get; set; }
    }
}
