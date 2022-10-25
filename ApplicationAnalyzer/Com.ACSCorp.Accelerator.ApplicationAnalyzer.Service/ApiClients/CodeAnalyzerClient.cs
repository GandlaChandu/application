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
    public class CodeAnalyzerClient : ICodeAnalyzerClient
    {
        #region Variables

        private readonly string _codeAnalyzerBaseUri;
        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        #endregion Variables

        #region Constructors

        public CodeAnalyzerClient(
            IConfiguration configuration,
            IHttpServiceFactory httpServiceFactory,
            IHttpHeaderService httpHeaderService)
        {
            _codeAnalyzerBaseUri = configuration.GetValue<string>("CodeAnalyzerBaseUrl");
            _httpService = httpServiceFactory.CreateHttpService();
            _httpHeaderService = httpHeaderService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<int> GetStaticScansCountAsync(ListParameter listParameter, int? projectId)
        {
            string uri = _codeAnalyzerBaseUri + CodeAnalyzerEndpoints.GetStaticScans;

            var staticScanListRequest = new
            {
                ProjectId = projectId,
                ListParameter = listParameter
            };

            var response = await _httpService.PostAsync(uri, staticScanListRequest, _httpHeaderService.ReadAuthHeader());

            if (response.IsSuccess)
            {
                var staticScans = JsonUtility.DeserializeObject<ListResult<object>>(response.Response);
                return staticScans.Total;
            }

            return default;
        }

        public async Task<List<ListItem<int>>> GetProjectStaticScanUrlListAsync(List<int> projectIdList)
        {
            string uri = _codeAnalyzerBaseUri + CodeAnalyzerEndpoints.GetProjectStaticScanUrlList;

            var response = await _httpService.PostAsync(uri, projectIdList, _httpHeaderService.ReadAuthHeader());

            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<List<ListItem<int>>>(response.Response);
            }

            return null;
        }

        public async Task<bool> CreateProjectAsync(string key)
        {
            string uri = _codeAnalyzerBaseUri + CodeAnalyzerEndpoints.CreateProject + key;
            var response = await _httpService.PostAsync(uri, null, _httpHeaderService.ReadAuthHeader());

            return response.IsSuccess;
        }

        public async Task<bool> PostScanAsync(int projectId)
        {
            string uri = _codeAnalyzerBaseUri + CodeAnalyzerEndpoints.StaticScanPost + projectId;
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
