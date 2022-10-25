using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService.ApiClients
{
    public interface IQueueApiClient
    {
        public Task<int> GetPendingQueueCountAsync();
    }
}
