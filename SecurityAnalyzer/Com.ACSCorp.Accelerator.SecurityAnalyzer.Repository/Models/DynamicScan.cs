using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models
{
    public partial class DynamicScan
    {
        public DynamicScan()
        {
            DynamicScanResult = new HashSet<DynamicScanResult>();
        }

        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Url { get; set; }
        public int RunById { get; set; }
        public short? StatusId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public DateTime? ScanStartTime { get; set; }
        public DateTime? ScanEndTime { get; set; }
        public short? UrlCount { get; set; }

        public virtual DynamicScanStatus Status { get; set; }
        public virtual ICollection<DynamicScanResult> DynamicScanResult { get; set; }
    }
}
