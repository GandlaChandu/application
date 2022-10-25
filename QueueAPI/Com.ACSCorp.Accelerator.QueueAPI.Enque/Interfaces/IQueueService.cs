using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Models;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.Enque.Interfaces
{
    public interface IQueueService
    {
        public Task<Result<long>> EnqueAsync(EnqueAPIModel enqueAPI);
        public Task<Result<QueueStatus>> GetQueueStatusAsync(long id);
        public Task<Result<QueueAPIEntity>> GetQueueAsync(long id);
        public Result<int> GetPendingQueueCount();
    }
}
