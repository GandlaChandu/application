using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models
{
    public partial class ScanPolicy
    {
        public ScanPolicy()
        {
            ScanPolicyMapping = new HashSet<ScanPolicyMapping>();
        }

        public int Id { get; set; }
        public string ScanPolicyName { get; set; }
        public Guid? ScanPolicyCode { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ClientId { get; set; }

        public virtual ICollection<ScanPolicyMapping> ScanPolicyMapping { get; set; }
    }
}
