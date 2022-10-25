using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository
{
    public interface IDynamicScanRepository
    {
        public Task<int> SaveDynamicScanAsync(DynamicScanDTO dynamicScanDTO);
        public Task<bool> UpdateDynamicScanAsync(DynamicScanDTO dynamicScanDTO);
        public Task<ListResult<DynamicScanDTO>> GetDynamicScansAsync(DynamicScanListRequest request, List<int> accessibleProjects);
        public Task<DynamicScanDTO> GetDynamicScanByIdAsync(int scanId);
    }
}
