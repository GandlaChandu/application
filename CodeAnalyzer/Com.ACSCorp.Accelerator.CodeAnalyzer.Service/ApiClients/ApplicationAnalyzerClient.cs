using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;
using Com.ACSCorp.Accelerator.Core.Utility;

using Microsoft.Extensions.Configuration;

using System.Collections.Generic;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.UriConstants;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.ApiClients
{
    public class ApplicationAnalyzerClient : IApplicationAnalyzerClient
    {
        private readonly IConfiguration _configuration;
        private readonly string _applicationAnalyzerBaseUri;
        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        public ApplicationAnalyzerClient(IConfiguration configuration,
            IHttpServiceFactory httpServiceFactory,
            IHttpHeaderService httpHeaderService)
        {
            _configuration = configuration;
            _applicationAnalyzerBaseUri = _configuration.GetValue<string>("ApplicationAnalyzerAPIUrl");
            _httpService = httpServiceFactory.CreateHttpService();
            _httpHeaderService = httpHeaderService;
        }

        /// <summary>
        /// Get Project Information by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ProjectDTO> GetProjectByIdAsync(int id)
        {
            string uri = _applicationAnalyzerBaseUri + ApplicationAnalyzerEndpoints.GetProjectById + id;

            var response = await _httpService.GetAsync(uri);
            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<ProjectDTO>(response.Response);
            }

            return null;
        }

        public async Task<List<IdNamePair>> GetProjectNamesByIdsAsync(IEnumerable<int> projectIds)
        {
            string uri = _applicationAnalyzerBaseUri + ApplicationAnalyzerEndpoints.GetProjectNamesByIds;

            var response = await _httpService.PostAsync(uri, projectIds, _httpHeaderService.ReadAuthHeader());

            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<List<IdNamePair>>(response.Response);
            }
            return null;
        }

        public async Task<ClientDTO> GetClientByIdAsync(int id)
        {
            string uri = _applicationAnalyzerBaseUri + ApplicationAnalyzerEndpoints.GetClientById + id;

            var response = await _httpService.GetAsync(uri, _httpHeaderService.ReadAuthHeader());
            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<ClientDTO>(response.Response);
            }
            return null;
        }

        /// <summary>
        /// Save VulnerabilityStatistics
        /// </summary>
        /// <param name="vulnerabilityStatisticsDTOs"></param>
        /// <returns></returns>
        public async Task<bool> SaveVulnerabilityStatistics(List<VulnerabilityStatisticsDTO> vulnerabilityStatisticsDTOs)
        {
            string uri = _applicationAnalyzerBaseUri + ApplicationAnalyzerEndpoints.SaveVulnerabilityStatistics;

            var response = await _httpService.PostAsync(uri, vulnerabilityStatisticsDTOs);
            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<bool>(response.Response);
            }

            return false;
        }

        public async Task<CurrentUserDTO> GetUserAsync(int id)
        {
            string uri = $"{_applicationAnalyzerBaseUri}{ApplicationAnalyzerEndpoints.GetUserById}{id}";

            var response = await _httpService.GetAsync(uri);
            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<CurrentUserDTO>(response.Response);
            }

            return null;
        }

        public async Task<List<CweInfoDTO>> GetCweInfoByIdsAsync(IEnumerable<int> cweIds)
        {
            string uri = _applicationAnalyzerBaseUri + ApplicationAnalyzerEndpoints.GetCweInfoByIds;

            var response = await _httpService.PostAsync(uri, cweIds, _httpHeaderService.ReadAuthHeader());

            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<List<CweInfoDTO>>(response.Response);
            }

            return null;
        }
    }
}
