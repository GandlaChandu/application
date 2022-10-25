using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class JobStatus
    {
        public JobStatus()
        {
            JobExecutionSummary = new HashSet<JobExecutionSummary>();
        }

        public short Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<JobExecutionSummary> JobExecutionSummary { get; set; }
    }
}
