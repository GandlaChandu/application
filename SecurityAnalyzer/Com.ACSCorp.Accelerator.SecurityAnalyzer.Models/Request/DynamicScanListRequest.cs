using Com.ACSCorp.Accelerator.Core.Models;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class DynamicScanListRequest 
    {
        public int? ProjectId { get; set; }
        public int? StatusId { get; set; }
        public string SearchTerm { get; set; }
        public ListParameter ListParameter { get; set; }
    }
}
