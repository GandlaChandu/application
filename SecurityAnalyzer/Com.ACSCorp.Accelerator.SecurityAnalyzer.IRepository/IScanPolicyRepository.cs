using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository
{
    public interface IScanPolicyRepository
    {
        public Task<ListResult<ScanPolicyDTO>> GetScanPoliciesAsync(ListParameter searchParameter = null);
        public List<IdNamePair> GetScanPolicyNames();
        public List<IdNamePair> GetScanPoliciesByEntityId(short entityTypeId, int entityId);
        public Task<int> CreateScanPolicyAsync(ScanPolicyDTO scanPolicyDTO);
        public Task<int> UpdateScanPolicyAsync(ScanPolicyDTO scanPolicy);
        public Task<ScanPolicyDTO> GetScanPolicyByIdAsync(int id);
    }
}
