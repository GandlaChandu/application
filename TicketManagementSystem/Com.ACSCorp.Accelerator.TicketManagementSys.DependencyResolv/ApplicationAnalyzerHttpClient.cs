using Com.ACSCorp.Accelerator.TicketManagementSystem.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http.Headers;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.DependencyResolver
{
    public static class ApplicationAnalyzerHttpClient
    {
        public static void AddApplicationAnalyzerHttpClient(this IServiceCollection services, IConfiguration configuration)
        {
            string baseAddress = configuration.GetValue<string>(Constant.ApplicationAnalyzerAPIUrl);
            services.AddHttpClient(Constant.ApplicationAnalyzerHttpClient, c =>
            {
                c.BaseAddress = new Uri(baseAddress);
                c.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            });
        }
    }
}
