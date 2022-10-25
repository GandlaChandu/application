using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces
{
    public interface IQueueProcessingService
    {
        /// <summary>
        /// Checks if queue is empty
        /// </summary>
        public bool IsQueueEmpty();

        /// <summary>
        /// proccessQueue
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task ProccessQueue(CancellationToken cancellationToken);
    }
}
