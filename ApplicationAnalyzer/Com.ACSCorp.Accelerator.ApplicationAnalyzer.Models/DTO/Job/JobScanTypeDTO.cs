using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job
{
    public class JobScanTypeDTO
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public ScanType ScanType { get; set; }
        public bool IsDeleted { get; set; }
    }
}
