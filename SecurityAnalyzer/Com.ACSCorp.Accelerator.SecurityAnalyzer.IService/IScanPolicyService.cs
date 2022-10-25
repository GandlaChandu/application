using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService
{
    public interface IScanPolicyService
    {
        public Task<Result<int>> CreateScanPolicyAsync(ScanPolicyDTO scanPolicyDTO);
        public Task<Result<int>> UpdateScanPolicyAsync(ScanPolicyDTO scanPolicyDTO);
        public Task<Result<ListResult<ScanPolicyDTO>>> GetScanPoliciesAsync(ListParameter searchParameter = null);
        public Task<Result<ScanPolicyDTO>> GetScanPolicyByIdAsync(int scanPolicyId);
        public Result<List<IdNamePair>> GetScanPolicyNames();
        public Result<List<IdNamePair>> GetScanPoliciesByEntityId(short entityTypeId, int entityId);
        public Task<Result<int>> SaveScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping);
        public Task<Result<int>> UpdateScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping);
        public Result<List<IdNamePair>> GetScanPolicyThresholdTypes();
        public Result<List<IdNamePair>> GetScanPolicyStrengthTypes();
        public Task<Result<bool>> DeleteScanPolicyMappingByIdAsync(int id);
        public Task<Result<bool>> DeleteScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping);
    }
}
