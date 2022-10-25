using Com.ACSCorp.Accelerator.Core.Models;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class StaticScanListRequest
    {
        public string SearchTerm { get; set; }
        public int? ProjectId { get; set; }
        public ListParameter ListParameter { get; set; }
    }
}
