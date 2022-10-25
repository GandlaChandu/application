using Com.ACSCorp.Accelerator.Core.Authorization.APIClient;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;
using Com.ACSCorp.Accelerator.Core.Utility;

using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;

using System.Collections.Generic;
using System.Net.Http;

namespace Com.ACSCorp.Accelerator.Core.Authorization
{
    public class ApplicationAnalyzerClient : IApplicationAnalyzerClient
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpService _httpService;

        public ApplicationAnalyzerClient(
            IHttpServiceFactory httpServiceFactory,
            IConfiguration configuration)
        {
            _configuration = configuration;
            _httpService = httpServiceFactory.CreateHttpService();
        }

        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="bearerToken"></param>
        /// <returns></returns>
        public Result<CurrentUserDTO> GetUserByTokenAsync(string bearerToken)
        {
            string applicationAnalyzerBaseUri = _configuration.GetValue<string>("ApplicationAnalyzerAPIUrl");

            HttpRequestModel request = new HttpRequestModel
            {
                RequestUrl = $"{ applicationAnalyzerBaseUri }Me/",
                HttpMethod = HttpMethod.Get,
                Headers = new Dictionary<string, string>()
                {
                    {HeaderNames.Authorization, bearerToken}
                }
            };

            var response = _httpService.SendAsync(request).Result;
            if (response.IsSuccess)
            {
                return Result.Ok(JsonUtility.DeserializeObject<CurrentUserDTO>(response.Response));
            }

            return Result.Fail<CurrentUserDTO>(response.Response);
        }
    }
}
