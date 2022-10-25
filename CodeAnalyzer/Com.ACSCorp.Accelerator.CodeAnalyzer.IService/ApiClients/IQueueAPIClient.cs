using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients
{
    public interface IQueueAPIClient
    {
        /// <summary>
        /// Queue Static scan
        /// </summary>
        /// <param name="scanId"></param>
        /// <returns></returns>
        public Task<long> QueueStaticScan(int scanId);

        /// <summary>
        /// Queue Api request
        /// </summary>
        /// <param name="queueAPIRequest"></param>
        /// <returns></returns>
        public Task<long> QueueApiRequest(QueueAPIRequestModel queueAPIRequest);
    }
}
