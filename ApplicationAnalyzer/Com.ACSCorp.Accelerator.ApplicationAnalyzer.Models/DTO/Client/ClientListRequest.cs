using Com.ACSCorp.Accelerator.Core.Models;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class ClientListRequest
    {
        public string SearchTerm { get; set; }
        public ListParameter ListParameter { get; set; }
    }
}
