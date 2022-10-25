using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces
{
    public interface IQueueExecutor
    {
        /// <summary>
        /// Execute Queue
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task ExecuteQueueAsync(CancellationToken cancellationToken);
    }
}
