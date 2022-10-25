using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.Process
{
    public class BatchQueueExecutor : BaseQueueExecutor, IQueueExecutor
    {
        private readonly IServiceProvider _serviceProvider;

        public BatchQueueExecutor(
            IConfiguration configuration,
            IQueueAPIRepository queueAPIRepository,
            IHttpService httpService,
            ILogger<BatchQueueExecutor> logger,
            IServiceProvider serviceProvider)
            : base(configuration, queueAPIRepository, httpService, logger)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task ExecuteQueueAsync(CancellationToken cancellationToken)
        {
            List<QueueAPIEntity> queueApis = GetQueuedRecords(_queueConfiguration.BatchSize);

            queueApis.UpdateQueStatus(QueueStatus.Picked);

            await _queueAPIRepository.UpdateRangeAsync(queueApis);

            bool isTaskInitialized = false;
            IProgress<bool> initializationProgressReporter = new Progress<bool>(isInitialized => isTaskInitialized = isInitialized);

            await Task.Run(() => { ExecuteBatchQueue(queueApis, initializationProgressReporter); }, cancellationToken);
        }

        private async void ExecuteBatchQueue(IEnumerable<QueueAPIEntity> queueApis, IProgress<bool> initializationProgress)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                base._queueAPIRepository = scope.ServiceProvider.GetRequiredService<IQueueAPIRepository>();
                base._httpService = scope.ServiceProvider.GetRequiredService<IHttpService>();

                initializationProgress.Report(true);

                foreach (var queueApi in queueApis)
                {
                    await ExecuteQueueRecord(queueApi);
                }
            }
        }
    }
}
