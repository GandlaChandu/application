using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.Dependencies.ServiceExtensions
{
    public static class CorsExtension
    {
        public static void RegisterCors(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(configuration.GetSection("AllowedOrigins").Get<string[]>())
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
        }
    }
}
