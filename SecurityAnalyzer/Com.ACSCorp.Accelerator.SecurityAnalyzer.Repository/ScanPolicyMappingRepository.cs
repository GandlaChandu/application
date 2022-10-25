using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

using System.Threading.Tasks;

using CoreEnums = Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository
{
    public class ScanPolicyMappingRepository : SecurityAnalyzerBaseRepository<ScanPolicyMapping>, IScanPolicyMappingRepository
    {
        public ScanPolicyMappingRepository(SecurityAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<ScanPolicyMappingDTO> GetScanPolicyMappingByIdAsync(int scanPolicyMappingId)
        {
            ScanPolicyMapping scanPolicy = await GetAsync(s => s.Id == scanPolicyMappingId);

            return scanPolicy?.ToScanPolicyMappingDTO();
        }

        public async Task<ScanPolicyMappingDTO> GetScanPolicyMappingByEntityIdAsync(CoreEnums.EntityType entityTypeId, int entityId)
        {
            ScanPolicyMapping scanPolicy = await GetAsync(s => s.EntityTypeId == (short)entityTypeId && s.EntityId == entityId && !s.IsDeleted);

            return scanPolicy?.ToScanPolicyMappingDTO();
        }

        public async Task<int> SaveScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping)
        {
            ScanPolicyMapping scanPolicy = scanPolicyMapping.ToScanPolicyMappingEntity();
            await AddAsync(scanPolicy);

            return scanPolicy.Id;
        }

        public async Task<int> UpdateScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping)
        {
            ScanPolicyMapping scanPolicy = scanPolicyMapping.ToScanPolicyMappingEntity();
            await UpdateAsync(scanPolicy);

            return scanPolicy.Id;
        }

        public async Task<ScanPolicyMappingDTO> GetScanPolicyMappingByEntityIdScanPolicyIdAsync(ScanPolicyMappingDTO scanPolicyMapping)
        {
            ScanPolicyMapping scanPolicy = await GetAsync(s => s.EntityTypeId == (short)scanPolicyMapping.EntityTypeId && s.EntityId == scanPolicyMapping.EntityId && s.ScanPolicyId == scanPolicyMapping.ScanPolicyId);

            return scanPolicy?.ToScanPolicyMappingDTO();
        }
    }
}
