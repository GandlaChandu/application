using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models
{
    public partial class ScanPolicyMapping
    {
        public int Id { get; set; }
        public short EntityTypeId { get; set; }
        public int EntityId { get; set; }
        public int ScanPolicyId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public virtual ScanPolicy ScanPolicy { get; set; }
    }
}
