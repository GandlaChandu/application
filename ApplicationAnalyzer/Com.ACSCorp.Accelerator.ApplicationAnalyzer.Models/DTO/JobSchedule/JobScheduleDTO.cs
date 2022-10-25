using Com.ACSCorp.Accelerator.Core.Models.DTO;

using System;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule
{
    public class JobScheduleDTO : BaseDTO
    {
        public int JobId { get; set; }
        public string CronSchedule { get; set; }
        public string CronScheduleDesc { get; set; }
        public bool IsActive { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
