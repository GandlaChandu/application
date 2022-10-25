using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class Client
    {
        public Client()
        {
            Division = new HashSet<Division>();
            VulnerabilityStatistics = new HashSet<VulnerabilityStatistics>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<Division> Division { get; set; }
        public virtual ICollection<VulnerabilityStatistics> VulnerabilityStatistics { get; set; }
    }
}
