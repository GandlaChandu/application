using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class CategoryDTO : BasePolicyDTO
    {
        public string Name { get; set; }
        public bool Enabled { get; set; }       
    }
}
