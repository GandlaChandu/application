using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;
using Com.ACSCorp.Accelerator.Core.Utility;

using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.Core.Authorization
{
    public class TokenService : ITokenService
    {
        private readonly LoginSettings settings = new LoginSettings();
        private readonly IHttpService _httpService;

        public TokenService(IHttpServiceFactory httpServiceFactory,
            IConfiguration configuration)
        {
            configuration.Bind("LoginSettings", settings);
            _httpService = httpServiceFactory.CreateHttpService();
        }

        /// <summary>
        /// Is Token Authorized
        /// </summary>
        /// <param name="bearerToken"></param>
        /// <returns></returns>
        public bool IsTokenValid(string bearerToken)
        {
            if (string.IsNullOrWhiteSpace(bearerToken))
            {
                return false;
            }

            var queryParams = new Dictionary<string, string>()
            {
                {"token",  bearerToken}
            };
            string tokenUrl = QueryHelpers.AddQueryString(settings.TokenValidationUrl, queryParams);
            var httpResponse = _httpService.GetAsync(tokenUrl).Result;
            if (httpResponse.IsSuccess)
            {
                return JsonUtility.DeserializeObject<bool>(httpResponse.Response);
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Get user details as claims
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public ClaimsModel GetUserClaims(string token)
        {
            ClaimsModel claims = null;
            var queryParams = new Dictionary<string, string>()
            {
                {"token",  token}
            };
            string tokenUrl = QueryHelpers.AddQueryString(settings.TokenClaimsUrl, queryParams);
            var httpResponse = _httpService.GetAsync(tokenUrl).Result;
            if (httpResponse.IsSuccess)
            {
                claims = JsonUtility.DeserializeObject<ClaimsModel>(httpResponse.Response);
            }

            return claims;
        }
    }
}
