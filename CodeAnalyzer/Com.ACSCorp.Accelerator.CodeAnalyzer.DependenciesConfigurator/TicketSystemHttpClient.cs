using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Net.Http.Headers;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.DependencyResolver
{
    public static class TicketSystemHttpClient
    {
        public static void AddTicketSystemHttpClient(this IServiceCollection services, IConfiguration configuration)
        {
            string baseAddress = configuration.GetValue<string>(Constants.TicketSystemEndPoint);
            services.AddHttpClient(Constants.TicketSystemHttpClient, c =>
            {
                c.BaseAddress = new Uri(baseAddress);
                c.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            });
        }
    }
}
