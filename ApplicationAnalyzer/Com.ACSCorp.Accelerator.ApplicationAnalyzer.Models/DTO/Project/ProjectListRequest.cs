using Com.ACSCorp.Accelerator.Core.Models;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class ProjectListRequest
    {
        public int? ClientId { get; set; }
        public int? DivisionId { get; set; }
        public string SearchTerm { get; set; }
        public ListParameter ListParameter { get; set; }
    }
}
