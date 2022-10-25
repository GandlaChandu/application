using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class Division
    {
        public Division()
        {
            Project = new HashSet<Project>();
            VulnerabilityStatistics = new HashSet<VulnerabilityStatistics>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int ClientId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsActive { get; set; }

        public virtual Client Client { get; set; }
        public virtual ICollection<Project> Project { get; set; }
        public virtual ICollection<VulnerabilityStatistics> VulnerabilityStatistics { get; set; }
    }
}
