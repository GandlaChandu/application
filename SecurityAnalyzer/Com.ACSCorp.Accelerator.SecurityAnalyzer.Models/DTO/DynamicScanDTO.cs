using Com.ACSCorp.Accelerator.Core.Models.DTO;

using System;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO
{
    public class DynamicScanDTO : BaseDTO
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string Url { get; set; }
        public int RunById { get; set; }
        public string Status { get; set; }
        public short? StatusId { get; set; }
        public DateTime? ScanStartTime { get; set; }
        public DateTime? ScanEndTime { get; set; }
        public short UrlCount { get; set; }
        public bool UpdateStartTimeOnly { get; set; }
        public bool UpdateEndTimeOnly { get; set; }
    }
}
