using Com.ACSCorp.Accelerator.Core.Authorization;
using Com.ACSCorp.Accelerator.Core.Authorization.APIClient;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Dependencies.MiddlewareExtensions;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.Core.Dependencies.ServiceExtensions
{
    public static class TokenAuthMiddlewareExtension
    {
        public static IApplicationBuilder UseTokenAuth(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TokenAuthMiddleware>();
        }
    }

    public static class TokenAuthResolver
    {
        public static void RegisterTokenAuth(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IApplicationAnalyzerClient, ApplicationAnalyzerClient>();
        }
    }
}