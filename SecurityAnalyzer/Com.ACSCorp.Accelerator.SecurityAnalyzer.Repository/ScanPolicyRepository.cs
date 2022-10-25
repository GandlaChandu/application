using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository
{
    public class ScanPolicyRepository : SecurityAnalyzerBaseRepository<ScanPolicy>, IScanPolicyRepository
    {
        public ScanPolicyRepository(SecurityAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<ListResult<ScanPolicyDTO>> GetScanPoliciesAsync(ListParameter searchParameter = null)
        {
            var query = GetAll(c => !c.IsDeleted && c.ClientId == null);
            var pagedResult = await QueryUtility<ScanPolicy>.GetQueryResultAsync(query, searchParameter);

            return new ListResult<ScanPolicyDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToScanPolicyDTOs()
            };
        }

        public List<IdNamePair> GetScanPolicyNames()
        {
            var query = GetAll(s => s.IsDeleted == false);
            var scanPolicies = query.Select(s => new IdNamePair
            {
                Id = s.Id,
                Name = s.ScanPolicyName
            });
            return scanPolicies.ToList();
        }

        public List<IdNamePair> GetScanPoliciesByEntityId(short entityTypeId, int entityId)
        {
            var query = _dbContext.ScanPolicyMapping.AsNoTracking()
                .Include(s => s.ScanPolicy)
                .Where(s => s.EntityTypeId == entityTypeId
                    && s.EntityId == entityId
                    && s.IsDeleted == false);

            var scanPolicies = query.Select(s => new IdNamePair
            {
                Id = s.ScanPolicyId,
                Name = s.ScanPolicy.ScanPolicyName
            });
            return scanPolicies.ToList();
        }

        public async Task<int> CreateScanPolicyAsync(ScanPolicyDTO scanPolicyDTO)
        {
            ScanPolicy scanPolicy = scanPolicyDTO.ToScanPolicyEntity();
            await AddAsync(scanPolicy);
            return scanPolicy.Id;
        }

        public async Task<int> UpdateScanPolicyAsync(ScanPolicyDTO scanPolicyDTO)
        {
            ScanPolicy scanPolicy = scanPolicyDTO.ToScanPolicyEntity();
            await UpdateAsync(scanPolicy);
            return scanPolicy.Id;
        }

        public async Task<ScanPolicyDTO> GetScanPolicyByIdAsync(int id)
        {
            ScanPolicy scanPolicy = await GetAsync(s => s.Id == id);
            return scanPolicy?.ToScanPolicyDTO();
        }
    }
}
