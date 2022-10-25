using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Utility;

using Microsoft.Extensions.Configuration;

using System.Collections.Generic;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.UriConstants;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service.ApiClients
{
    public class SecurityAnalyzerClient : ISecurityAnalyzerClient
    {
        #region Variables

        private readonly string _securityAnalyzerBaseUri;
        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        #endregion Variables

        #region Constructors

        public SecurityAnalyzerClient(
            IConfiguration configuration,
            IHttpServiceFactory httpServiceFactory,
            IHttpHeaderService httpHeaderService)
        {
            _securityAnalyzerBaseUri = configuration.GetValue<string>("SecurityAnalyzerBaseUrl");
            _httpService = httpServiceFactory.CreateHttpService();
            _httpHeaderService = httpHeaderService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<int> GetDynamicScansCountAsync(ListParameter listParameter, int? projectId)
        {
            string uri = _securityAnalyzerBaseUri + SecurityAnalyzerEndpoints.GetDynamicScans;

            var dynamicScanListRequest = new
            {
                ProjectId = projectId,
                ListParameter = listParameter
            };

            var response = await _httpService.PostAsync(uri, dynamicScanListRequest, _httpHeaderService.ReadAuthHeader());

            if (response.IsSuccess)
            {
                var dynamicScans = JsonUtility.DeserializeObject<ListResult<object>>(response.Response);
                return dynamicScans.Total;
            }

            return default;
        }

        public async Task<List<ListItem<int>>> GetProjectDynamicScanUrlListAsync(List<int> projectIdList)
        {
            string uri = _securityAnalyzerBaseUri + SecurityAnalyzerEndpoints.GetProjectDynamicScanUrlList;

            var response = await _httpService.PostAsync(uri, projectIdList, _httpHeaderService.ReadAuthHeader());

            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<List<ListItem<int>>>(response.Response);
            }

            return null;
        }

        public async Task<bool> PostScanAsync(int projectId)
        {
            string uri = _securityAnalyzerBaseUri + SecurityAnalyzerEndpoints.DynamicScanPost + projectId;
            var response = await _httpService.PostAsync(uri, null);

            if (response.IsSuccess)
            {
                int scanId = JsonUtility.DeserializeObject<int>(response.Response);
                return scanId > 0;
            }

            return false;
        }

        #endregion Public Methods
    }
}
