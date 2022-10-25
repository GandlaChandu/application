using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository
{
    public interface IScanPolicyMappingRepository
    {
        public Task<ScanPolicyMappingDTO> GetScanPolicyMappingByIdAsync(int scanPolicyMappingId);
        public Task<ScanPolicyMappingDTO> GetScanPolicyMappingByEntityIdAsync(EntityType entityTypeId, int entityId);
        public Task<int> SaveScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping);
        public Task<int> UpdateScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping);
        public Task<ScanPolicyMappingDTO> GetScanPolicyMappingByEntityIdScanPolicyIdAsync(ScanPolicyMappingDTO scanPolicyMapping);
    }
}
