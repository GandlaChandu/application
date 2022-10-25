using Com.ACSCorp.Accelerator.DMA.Schdeuler.CronExpressionResolver;
using Com.ACSCorp.Accelerator.DMA.Scheduler;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Queue;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Services;
using Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Interfaces;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.DMA.SchedulerWorkerService
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using (var serviceScope = host.Services.CreateScope())
            {
                var services = serviceScope.ServiceProvider;

                try
                {
                    var monitorLoop = services.GetRequiredService<MonitorLoop>();
                    var applicationLifetime = services.GetRequiredService<IHostApplicationLifetime>();
                    CancellationToken _cancellationToken = applicationLifetime.ApplicationStopping;
                    monitorLoop.StartMonitorLoop(_cancellationToken);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred.");
                }
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseWindowsService()
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddSingleton<MonitorLoop>();
                    services.AddHostedService<QueuedHostedService>();
                    services.AddSingleton<IBackgroundTaskQueue, BackgroundTaskQueue>();
                    services.AddTransient<ISchedulerService, SchedulerService>();
                    services.AddTransient<ICronResolver, CronResolver>();
                });
    }
}
