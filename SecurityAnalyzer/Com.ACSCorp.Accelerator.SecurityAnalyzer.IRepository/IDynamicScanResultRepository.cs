using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository
{
    public interface IDynamicScanResultRepository
    {
        public Task<bool> SaveDynamicScanResultAsync(List<DynamicScanResultDTO> results);
        public Task<ListResult<DynamicScanResultDTO>> GetDynamicScanResultsAsync(int scanId, ListParameter searchParameter = null);
        public Task<List<DynamicScanResultDTO>> GetDynamicScanResultsByScanIdAsync(int scanId);
    }
}
