using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.AspNetCore.Http;

using System.Net;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.Core.Dependencies.MiddlewareExtensions
{
    public class TokenAuthMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenAuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IAuthService authService)
        {
            Result<bool> tokenResult = authService.ValidateUserToken();

            if (!tokenResult.IsSucceeded || !tokenResult.Value)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await context.Response.WriteAsync(tokenResult.GetErrorString());
            }
            else
            {
                await _next.Invoke(context);
            }
        }
    }
}
