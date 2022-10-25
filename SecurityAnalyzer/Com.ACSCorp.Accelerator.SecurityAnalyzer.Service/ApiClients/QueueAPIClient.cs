using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;

using Microsoft.Extensions.Configuration;

using System.Collections.Generic;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Constants;
using static Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.UriConstants;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service.ApiClients
{
    public class QueueAPIClient : IQueueAPIClient
    {
        #region Variables

        private readonly IConfiguration _configuration;
        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        #endregion Variables

        #region Constructors

        public QueueAPIClient(
            IConfiguration configuration,
            IHttpServiceFactory httpServiceFactory,
            IHttpHeaderService httpHeaderService)
        {
            _configuration = configuration;
            _httpService = httpServiceFactory.CreateHttpService();
            _httpHeaderService = httpHeaderService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<long> QueueDynamicScan(int scanId)
        {
            string currentSiteUrl = _configuration.GetValue<string>(AppSettingConstants.SecurityAnalyzerBaseUrl);

            QueueAPIRequestModel queueAPIRequest = new QueueAPIRequestModel
            {
                Uri = $"{currentSiteUrl}DynamicScan/InitiateScan/{scanId}",
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

            var response = await _httpService.PostAsync(uri, queueAPIRequest);

            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<long>(response.Response);
            }
            return 0;
        }

        #endregion Public Methods

        #region Private Methods

        private string GetHeaders()
        {
            Dictionary<string, string> headers = _httpHeaderService.ReadAuthHeader();
            return JsonUtility.SerializeObject(headers);
        }

        #endregion Private Methods
    }
}
