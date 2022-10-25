using Com.ACSCorp.Accelerator.Core.Authorization.APIClient;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;

using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace Com.ACSCorp.Accelerator.Core.Authorization
{
    public class AuthService : IAuthService
    {
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IIdentityService _identityService;

        public AuthService(IHttpContextAccessor httpContextAccessor,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            IIdentityService identityService)
        {
            _httpContextAccessor = httpContextAccessor;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _identityService = identityService;
        }

        public Result<bool> ValidateUserToken()
        {
            string bearerToken = _httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Authorization];

            if (string.IsNullOrWhiteSpace(bearerToken))
            {
                return Result.Fail<bool>("Authorization Token is empty");
            }

            Result<CurrentUserDTO> userResult = _applicationAnalyzerClient.GetUserByTokenAsync(bearerToken);
            if (!userResult.IsSucceeded
                || string.IsNullOrWhiteSpace(userResult.Value.Email)
                || !userResult.Value.IsActive)
            {
                return Result.Fail<bool>(userResult.GetErrorString());
            }

            _identityService.SetUser(userResult.Value);

            return Result.Ok(true);
        }
    }
}
