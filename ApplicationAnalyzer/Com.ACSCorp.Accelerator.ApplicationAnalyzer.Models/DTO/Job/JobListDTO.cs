using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.Core.Models.DTO;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job
{
    public class JobListDTO : BaseDTO
    {
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        public bool? IsScheduled { get; set; }
        public string Project { get; set; }
        public string Division { get; set; }
        public string Client { get; set; }
        public string ScanType { get; set; }
        public JobScheduleDTO Schedule { get; set; }
    }
}
