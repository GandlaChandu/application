using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService
{
    public interface IDynamicScanResultService
    {
        public Task<bool> SaveDynamicScanResultAsync(List<DynamicScanResultDTO> results);
        public Task<Result<ListResult<DynamicScanResultDTO>>> GetDynamicScanResultsAsync(int scanId, ListParameter searchParameter = null);
        public Task<Result<List<DynamicScanResultDTO>>> GetDynamicScanResultsByScanIdAsync(int scanId);
    }
}
