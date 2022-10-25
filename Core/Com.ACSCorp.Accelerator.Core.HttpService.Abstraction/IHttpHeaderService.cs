using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.Core.HttpService.Abstraction
{
    public interface IHttpHeaderService
    {
        public string Read(string headerKey);
        public Dictionary<string, string> ReadHeader(string headerKey);
        public Dictionary<string, string> ReadAuthHeader();
    }
}
