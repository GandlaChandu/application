using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class JobSchedule
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public string CronSchedule { get; set; }
        public string CronScheduleDesc { get; set; }
        public bool IsActive { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedById { get; set; }

        public virtual Job Job { get; set; }
    }
}
