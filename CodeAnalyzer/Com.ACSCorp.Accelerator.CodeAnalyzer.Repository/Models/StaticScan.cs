using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models
{
    public partial class StaticScan
    {
        public StaticScan()
        {
            StaticScanResult = new HashSet<StaticScanResult>();
        }

        public int Id { get; set; }
        public string Url { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int RunById { get; set; }
        public short? StatusId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int ProjectStaticScanDetailsId { get; set; }
        public string SonarQubeAnalysisTaskId { get; set; }
        public int ProjectId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public virtual StaticScanStatus Status { get; set; }
        public virtual ICollection<StaticScanResult> StaticScanResult { get; set; }
    }
}
