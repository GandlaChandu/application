using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class Job
    {
        public Job()
        {
            JobExecutionSummary = new HashSet<JobExecutionSummary>();
            JobScanType = new HashSet<JobScanType>();
            JobSchedule = new HashSet<JobSchedule>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        public bool? IsScheduled { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int ProjectId { get; set; }
        public bool IsDeleted { get; set; }

        public virtual Project Project { get; set; }
        public virtual ICollection<JobExecutionSummary> JobExecutionSummary { get; set; }
        public virtual ICollection<JobScanType> JobScanType { get; set; }
        public virtual ICollection<JobSchedule> JobSchedule { get; set; }
    }
}
