using Com.ACSCorp.Accelerator.Core.Models.DTO;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class ProjectDTO: BaseDTO
    {
        public int? ClientId { get; set; }
        public string ClientName { get; set; }
        public string DivisionName { get; set; }
        public string Name { get; set; }
        public int DivisionId { get; set; }
    }
}
