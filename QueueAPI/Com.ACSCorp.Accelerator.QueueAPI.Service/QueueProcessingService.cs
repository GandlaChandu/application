using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Models;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;

using Microsoft.Extensions.Configuration;

using System;
using System.Threading;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.QueueAPI.Common.Constants;

namespace Com.ACSCorp.Accelerator.QueueAPI.Process
{
    public class QueueProcessingService : IQueueProcessingService
    {
        private readonly IQueueAPIRepository _queueAPIRepository;
        private readonly IQueueExecutor _queueExecutor;
        private readonly QueueConfiguration queueConfiguration;

        public QueueProcessingService(
            IConfiguration configuration
            , IQueueAPIRepository queueAPIRepository
            , Func<QueueProcessingType, IQueueExecutor> queueProcessingServiceAccessor
            )
        {
            _queueAPIRepository = queueAPIRepository;
            queueConfiguration = configuration
                                    .GetSection(AppSettingConstants.QueueConfiguration)
                                    .Get<QueueConfiguration>();
            _queueExecutor = queueProcessingServiceAccessor(queueConfiguration.QueueProcessingType);
        }

        public bool IsQueueEmpty()
        {
            int count = GetQueueCountByStatus(QueueStatus.Queued);
            return count == 0;
        }

        public async Task ProccessQueue(CancellationToken cancellationToken)
        {
            await _queueExecutor.ExecuteQueueAsync(cancellationToken);
        }

        private int GetQueueCountByStatus(QueueStatus queueStatus)
        {
            return _queueAPIRepository.GetCount(s => s.Status == (short)queueStatus);
        }
    }
}
