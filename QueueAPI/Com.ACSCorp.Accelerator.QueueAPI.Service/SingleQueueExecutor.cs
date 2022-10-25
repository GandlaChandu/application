using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.Process
{
    public class SingleQueueExecutor : BaseQueueExecutor, IQueueExecutor
    {
        public SingleQueueExecutor(
            IConfiguration configuration,
            IQueueAPIRepository queueAPIRepository,
            IHttpService httpService,
            ILogger<SingleQueueExecutor> logger)
            : base(configuration, queueAPIRepository, httpService, logger)
        {
        }

        public async Task ExecuteQueueAsync(CancellationToken cancellationToken)
        {
            QueueAPIEntity queueApi = GetQueuedRecords(1).FirstOrDefault();

            if (queueApi != null)
            {
                queueApi.Status = (int)QueueStatus.Picked;
                await _queueAPIRepository.UpdateAsync(queueApi);

                await ExecuteQueueRecord(queueApi);
            }
        }
    }
}
