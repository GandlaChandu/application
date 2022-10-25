using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Enums;

using System;

namespace Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Models
{
    public class JobExecutionSummary
    {
        public int JobId { get; set; }
        public string JobName { get; set; }
        public string Message { get; set; }
        public JobStatus RunStatus { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public DateTime? LastSuccessRunTime { get; set; }
        public TimeSpan? RunDuration { get; set; }
        public int Id { get; set; }
    }
}