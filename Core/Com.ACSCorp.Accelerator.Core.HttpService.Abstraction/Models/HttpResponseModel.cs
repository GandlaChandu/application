using System.Net;

namespace Com.ACSCorp.Accelerator.Core.HttpService.Abstraction.Models
{
    public class HttpResponseModel
    {
        public bool IsSuccess { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string Response { get; set; }
    }
}
