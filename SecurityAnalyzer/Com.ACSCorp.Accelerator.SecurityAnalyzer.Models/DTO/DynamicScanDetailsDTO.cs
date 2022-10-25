using Com.ACSCorp.Accelerator.Core.Models.DTO;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class DynamicScanDetailsDTO : BaseDTO
    {
        public int ProjectId { get; set; }
        public string ApplicationURL { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
