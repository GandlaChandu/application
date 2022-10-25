using Com.ACSCorp.Accelerator.QueueAPI.Models;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.QueueAPI.Common.Constants;

namespace Com.ACSCorp.Accelerator.QueueAPI.Worker
{
    public class Worker : BackgroundService
    {
        private readonly IConfiguration _configuration;
        private readonly WorkerConfiguration _workerConfiguration;
        private readonly IServiceProvider _services;
        private readonly ILogger<Worker> _logger;

        public Worker(IConfiguration configuration, IServiceProvider services, ILogger<Worker> logger)
        {
            _configuration = configuration;
            _services = services;
            _workerConfiguration = _configuration
                                    .GetSection(AppSettingConstants.WorkerConfiguration)
                                    .Get<WorkerConfiguration>();
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _services.CreateScope())
                    {
                        IQueueProcessingService _queueAPIService = scope.ServiceProvider
                        .GetRequiredService<IQueueProcessingService>();

                        if (!_queueAPIService.IsQueueEmpty())
                        {
                            await _queueAPIService.ProccessQueue(stoppingToken);
                        }
                    }
                    await Task.Delay(_workerConfiguration.TriggerDelayInSeconds * 1000, stoppingToken);

                }
                catch (Exception ex)
                {
                    _logger.LogError("QueueAPI worker process failed.", ex);
                }
            }
        }
    }
}
