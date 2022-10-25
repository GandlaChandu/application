using System.Threading.Tasks;

using Com.ACSCorp.Accelerator.TicketManagementSystem.Common;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IRepository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Service;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.API
{
    public class HeaderInfoMiddleware
    {
        private readonly RequestDelegate _next;
        public HeaderInfoMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext,
            ITicketSystemConfigurationRepository ticketSystemConfigurationRepository,
            IHeaderValuesService headerValuesService)
        {
            int.TryParse(httpContext.Request.Headers[Constant.HeaderProjectId], out int projectId);
            var ticketSystemConfiguration = await ticketSystemConfigurationRepository.GetByProjectIdAsync(projectId);

            if (headerValuesService is HeaderValuesService headerService)
            {
                headerService.SetHeaderInfo(projectId, ticketSystemConfiguration);
            }

            await _next(httpContext);
        }
    }

    public static class HeaderInfoMiddlewareExtensions
    {
        public static IApplicationBuilder UseHeaderInfoMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<HeaderInfoMiddleware>();
        }
    }
}
