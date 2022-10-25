using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.DependencyResolver
{
    public static class SonarQubeHttpClient
    {
        public static void AddSonarHttpClient(this IServiceCollection services, IConfiguration configuration)
        {
            SonarQubeCredentials sonarQubeCredentials = configuration.GetSection(Constants.SonarServerInfo).Get<SonarQubeCredentials>();

            string baseAddress = $"{configuration.GetValue<string>(Constants.SonarServerEndPoint)}/api/";
            services.AddHttpClient(Constants.SonarServerHttpClient, c =>
            {
                c.BaseAddress = new Uri(baseAddress);
                c.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                byte[] credentials = Encoding.ASCII.GetBytes($"{sonarQubeCredentials.UserName}:{sonarQubeCredentials.Password}");
                c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(credentials));
            }).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
            {
                CookieContainer = new CookieContainer()
            });
        }
    }
}
