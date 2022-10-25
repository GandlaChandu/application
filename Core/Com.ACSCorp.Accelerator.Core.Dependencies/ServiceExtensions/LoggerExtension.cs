using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Serilog;

namespace Com.ACSCorp.Accelerator.Dependencies.ServiceExtensions
{
    public static class LoggerExtension
    {
        public static void RegisterLogger(this IServiceCollection services, IConfiguration configuration)
        {
            // Configuring Serilog
            Log.Logger = new LoggerConfiguration()
                                .ReadFrom
                                .Configuration(configuration)
                                .CreateLogger();

            services.AddLogging((builder) =>
            {
                builder.AddSerilog(dispose: true);
            });
        }
    }
}
