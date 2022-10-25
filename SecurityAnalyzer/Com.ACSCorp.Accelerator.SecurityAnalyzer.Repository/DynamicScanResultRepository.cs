using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository
{
    public class DynamicScanResultRepository : SecurityAnalyzerBaseRepository<DynamicScanResult>, IDynamicScanResultRepository
    {
        public DynamicScanResultRepository(SecurityAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<bool> SaveDynamicScanResultAsync(List<DynamicScanResultDTO> results)
        {
            await AddRangeAsync(results.ToDynamicScanResultList());

            return true;
        }

        public async Task<ListResult<DynamicScanResultDTO>> GetDynamicScanResultsAsync(int scanId, ListParameter searchParameter = null)
        {
            var query = GetAll(x => x.DynamicScanId == scanId);
            var pagedResult = await QueryUtility<DynamicScanResult>.GetQueryResultAsync(query, searchParameter);

            return new ListResult<DynamicScanResultDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToDynamicScanResultDTOList()
            };
        }

        public async Task<List<DynamicScanResultDTO>> GetDynamicScanResultsByScanIdAsync(int scanId)
        {
            var query = GetAll(x => x.DynamicScanId == scanId);
            query = query.Include(s => s.DynamicScan).AsNoTracking();
            List<DynamicScanResult> dynamicScanResults = await query.ToListAsync();

            return dynamicScanResults.ToDynamicScanResultDTOList();
        }
    }
}
