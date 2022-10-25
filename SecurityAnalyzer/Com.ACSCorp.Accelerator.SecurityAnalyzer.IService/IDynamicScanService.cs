using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService
{
    public interface IDynamicScanService
    {
        public Task<Result<int>> QueueDynamicScanAsync(int projectId, bool verifyAccess = false);
        public Task<Result> InitiateDynamicScanAsync(int dynamicScanId);
        public Task<Result<ListResult<DynamicScanDTO>>> GetDynamicScansAsync(DynamicScanListRequest request);
        public Task<Result<DynamicScanDTO>> GetDynamicScanByIdAsync(int scanId);
    }
}
