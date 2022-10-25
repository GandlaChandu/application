using Com.ACSCorp.Accelerator.Core.HttpService;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;

using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.Dependencies.ServiceExtensions
{
    public static class HttpServiceResolver
    {
        public static void AddHttpService(this IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddScoped<IHttpService, HttpService>();
            services.AddScoped<IHttpServiceFactory, HttpServiceFactory>();
            services.AddScoped<IHttpHeaderService, HttpHeaderService>();
        }
    }
}
