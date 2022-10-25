using Com.ACSCorp.Accelerator.Dependencies.ServiceExtensions;
using Com.ACSCorp.Accelerator.QueueAPI.DependencyResolver;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Com.ACSCorp.Accelerator.QueueAPI.Worker
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseWindowsService()
                .ConfigureServices((hostContext, services) =>
                {
                    services.RegisterLogger(hostContext.Configuration);
                    services.AddHttpService();
                    services.AddHttpContextAccessor();
                    services.AddQueueWorker(hostContext.Configuration);
                    services.AddHostedService<Worker>();
                });
    }
}
