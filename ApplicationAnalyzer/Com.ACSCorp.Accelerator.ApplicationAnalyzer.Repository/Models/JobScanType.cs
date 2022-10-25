using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class JobScanType
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public short ScanTypeId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public virtual Job Job { get; set; }
        public virtual ScanType ScanType { get; set; }
    }
}
