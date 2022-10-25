using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService
{
    public interface IDynamicScanDetailService
    {
        public Task<Result<int>> AddDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails);
        public Task<Result<bool>> UpdateDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails);
        public Task<Result<DynamicScanDetailsDTO>> GetDynamicScanDetailsAsync(int projectId);
        public Task<Result<bool>> DeleteDynamicScanDetailsByIdAsync(int id);
        public Task<Result<List<ListItem<int>>>> GetProjectDynamicScanUrlListAsync(List<int> projectIdList);
    }
}
