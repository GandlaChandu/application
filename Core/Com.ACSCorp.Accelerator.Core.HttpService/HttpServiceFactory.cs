using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using System.Net.Http;

namespace Com.ACSCorp.Accelerator.Core.HttpService
{
    public class HttpServiceFactory : IHttpServiceFactory
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HttpServiceFactory(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public IHttpService CreateHttpService()
        {
            return new HttpService(_httpClientFactory.CreateClient());
        }

        public IHttpService CreateHttpService(string name)
        {
            return new HttpService(_httpClientFactory.CreateClient(name));
        }
    }
}
