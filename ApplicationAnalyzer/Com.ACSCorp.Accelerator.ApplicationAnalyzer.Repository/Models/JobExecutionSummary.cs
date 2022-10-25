using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class JobExecutionSummary
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public string JobName { get; set; }
        public string Message { get; set; }
        public short JobStatusId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public DateTime? LastSuccessRunTime { get; set; }
        public TimeSpan? RunDuration { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int CreatedById { get; set; }
        public int? ModifiedById { get; set; }

        public virtual Job Job { get; set; }
        public virtual JobStatus JobStatus { get; set; }
    }
}
