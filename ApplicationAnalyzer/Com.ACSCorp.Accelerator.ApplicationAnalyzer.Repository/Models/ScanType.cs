using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class ScanType
    {
        public ScanType()
        {
            JobScanType = new HashSet<JobScanType>();
            VulnerabilityStatistics = new HashSet<VulnerabilityStatistics>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<JobScanType> JobScanType { get; set; }
        public virtual ICollection<VulnerabilityStatistics> VulnerabilityStatistics { get; set; }
    }
}
