using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients
{
    public interface IQueueAPIClient
    {
        /// <summary>
        /// Queue Static scan
        /// </summary>
        /// <param name="scanId"></param>
        /// <returns></returns>
        public Task<long> QueueDynamicScan(int scanId);

        /// <summary>
        /// Queue Api request
        /// </summary>
        /// <param name="queueAPIRequest"></param>
        /// <returns></returns>
        public Task<long> QueueApiRequest(QueueAPIRequestModel queueAPIRequest);
    }
}
