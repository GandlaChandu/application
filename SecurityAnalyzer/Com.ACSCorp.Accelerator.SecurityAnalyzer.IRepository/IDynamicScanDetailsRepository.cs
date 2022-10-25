using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository
{
    public interface IDynamicScanDetailsRepository
    {
        public Task<int> AddDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails);
        public Task<bool> UpdateDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails);
        public Task<DynamicScanDetailsDTO> GetDynamicScanDetailsByProjectIdAsync(int projectId);
        public Task<DynamicScanDetailsDTO> GetDynamicScanDetailsByIdAsync(int id);
        public Task<List<ListItem<int>>> GetProjectDynamicScanUrlListAsync(List<int> projectIdList);
    }
}
