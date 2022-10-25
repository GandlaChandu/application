using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.Core.Models.DTO;

using System;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobExecutionSummary
{
    public class JobExecutionSummaryDTO : BaseDTO
    {
        public int JobId { get; set; }
        public string Jobname { get; set; }
        public string Message { get; set; }
        public JobStatus RunStatus { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public DateTime? LastSuccessRunTime { get; set; }
        public TimeSpan? RunDuration { get; set; }
    }
}
