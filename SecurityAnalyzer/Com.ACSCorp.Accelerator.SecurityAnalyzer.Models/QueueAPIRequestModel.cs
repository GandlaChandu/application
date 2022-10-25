using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class QueueAPIRequestModel
    {
        public string Uri { get; set; }
        public string Headers { get; set; }
        public HttpMethodType HttpType { get; set; }
        public string Content { get; set; }
    }
}
