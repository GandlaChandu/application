using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class StaticScanReportScopeModel
    {
        public string Url { get; set; }
        public string Username { get; set; }
        public TimeSpan? ScanDuration { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
