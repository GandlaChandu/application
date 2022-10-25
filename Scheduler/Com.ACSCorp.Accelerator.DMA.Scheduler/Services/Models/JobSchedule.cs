using System;

namespace Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Models
{
    public class JobSchedule
    {
        public int ScheduleId { get; set; }
        public int JobId { get; set; }
        public string JobName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CronSchedule { get; set; }
        public string CronScheduleDesc { get; set; }
        public bool IsActive { get; set; }
    }
}