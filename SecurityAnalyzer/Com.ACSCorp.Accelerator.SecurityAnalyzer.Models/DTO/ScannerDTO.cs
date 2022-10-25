using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class ScannerDTO : BasePolicyDTO
    {
        public int PolicyId { get; set; }
        public string Name { get; set; }       
        public bool Enabled { get; set; }
    }
}
