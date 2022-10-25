using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.Core.Utility;

using Microsoft.Extensions.Configuration;

using System.Collections.Generic;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.Constants;
using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.UriConstants;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.ApiClients
{
    public class QueueAPIClient : IQueueAPIClient
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        public QueueAPIClient(
            IConfiguration configuration,
            IHttpServiceFactory httpServiceFactory,
            IHttpHeaderService httpHeaderService)
        {
            _configuration = configuration;
            _httpService = httpServiceFactory.CreateHttpService();
            _httpHeaderService = httpHeaderService;
        }

        public async Task<long> QueueStaticScan(int scanId)
        {
            string currentSiteUrl = _configuration.GetValue<string>(AppSettingConstants.CodeAnalyzerBaseUrl);

            QueueAPIRequestModel queueAPIRequest = new QueueAPIRequestModel
            {
                Uri = $"{currentSiteUrl}StaticScan/InitiateStaticScan/{scanId}",
                HttpType = HttpMethodType.Post,
                Headers = GetHeaders()
            };
            return await QueueApiRequest(queueAPIRequest);
        }

        /// <summary>
        /// Queue an API request
        /// </summary>
        /// <param name="queueAPIRequest"></param>
        /// <returns></returns>
        public async Task<long> QueueApiRequest(QueueAPIRequestModel queueAPIRequest)
        {
            string queueApiBaseUrl = _configuration.GetValue<string>(AppSettingConstants.QueueAPIUrl);
            string uri = queueApiBaseUrl + QueueApiEndpoints.PostQueueAPI;

            var response = await _httpService.PostAsync(uri, queueAPIRequest, _httpHeaderService.ReadAuthHeader());

            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<long>(response.Response);
            }
            return 0;
        }

        private string GetHeaders()
        {
            Dictionary<string, string> headers = _httpHeaderService.ReadAuthHeader();
            return JsonUtility.SerializeObject(headers);
        }
    }
}
