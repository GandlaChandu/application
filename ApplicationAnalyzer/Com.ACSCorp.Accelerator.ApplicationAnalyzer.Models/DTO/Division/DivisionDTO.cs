using Com.ACSCorp.Accelerator.Core.Models.DTO;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class DivisionDTO : BaseDTO
    {
        public string Name { get; set; }
        public int ClientId { get; set; }
        public bool IsActive { get; set; }
    }
}
