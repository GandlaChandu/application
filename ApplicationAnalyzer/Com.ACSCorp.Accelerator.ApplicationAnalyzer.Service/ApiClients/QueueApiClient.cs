using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Utility;

using Microsoft.Extensions.Configuration;

using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.UriConstants;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service.ApiClients
{
    public class QueueApiClient : IQueueApiClient
    {
        #region Variables

        private readonly string _queueApiBaseUri;
        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        #endregion Variables

        #region Constructors

        public QueueApiClient(
            IConfiguration configuration,
            IHttpServiceFactory httpServiceFactory,
            IHttpHeaderService httpHeaderService)
        {
            _queueApiBaseUri = configuration.GetValue<string>("QueueAPIUrl");
            _httpService = httpServiceFactory.CreateHttpService();
            _httpHeaderService = httpHeaderService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<int> GetPendingQueueCountAsync()
        {
            string uri = _queueApiBaseUri + QueueApiEndpoints.GetPendingQueueCount;

            var response = await _httpService.GetAsync(uri, _httpHeaderService.ReadAuthHeader());

            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<int>(response.Response);
            }

            return default;
        }

        #endregion Public Methods
    }
}
