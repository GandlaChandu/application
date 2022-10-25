using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.Core.Models.DTO;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job
{
    public class JobDTO : BaseDTO
    {
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        public bool? IsScheduled { get; set; }
        public int ProjectId { get; set; }
        public int DivisionId { get; set; }
        public int ClientId { get; set; }
        public List<JobScanTypeDTO> ScanTypes { get; set; }
        public JobScheduleDTO Schedule { get; set; }
    }
}
