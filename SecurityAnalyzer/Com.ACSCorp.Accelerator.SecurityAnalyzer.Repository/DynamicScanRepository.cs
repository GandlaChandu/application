using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository
{
    public class DynamicScanRepository : SecurityAnalyzerBaseRepository<DynamicScan>, IDynamicScanRepository
    {
        public DynamicScanRepository(SecurityAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<int> SaveDynamicScanAsync(DynamicScanDTO dynamicScanDTO)
        {
            var scan = dynamicScanDTO.ToDynamicScan();

            await AddAsync(scan);
            return scan.Id;
        }

        public async Task<bool> UpdateDynamicScanAsync(DynamicScanDTO dynamicScanDTO)
        {
            var scan = _dbContext.Find<DynamicScan>(dynamicScanDTO.Id);

            if (scan == null)
            {
                return false;
            }

            if (dynamicScanDTO.UpdateStartTimeOnly)
            {
                scan.ScanStartTime = DateTime.Now;
            }
            else if (dynamicScanDTO.UpdateEndTimeOnly)
            {
                scan.ScanEndTime = DateTime.Now;
                scan.UrlCount = dynamicScanDTO.UrlCount;
            }
            else
            {
                scan.StatusId = dynamicScanDTO.StatusId;
            }

            _dbContext.Entry(scan).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<ListResult<DynamicScanDTO>> GetDynamicScansAsync(DynamicScanListRequest request, List<int> accessibleProjects)
        {
            var query = GetAll(c => !c.IsDeleted, c => c.Status);

            if (accessibleProjects != null)
            {
                query = query.Where(c => accessibleProjects.Contains(c.ProjectId));
            }

            query = ApplyFilters(request, query).OrderByDescending(c => c.Id);

            var pagedResult = await QueryUtility<DynamicScan>.GetQueryResultAsync(query, request.ListParameter);

            return new ListResult<DynamicScanDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToDynamicScanDTOList()
            };
        }

        public async Task<DynamicScanDTO> GetDynamicScanByIdAsync(int scanId)
        {
            var result = await GetAsync(s => s.Id == scanId);

            return result.ToDynamicScanDTO();
        }

        private IQueryable<DynamicScan> ApplyFilters(DynamicScanListRequest request, IQueryable<DynamicScan> query)
        {
            if (request.ProjectId.HasValue)
            {
                query = query.Where(c => c.ProjectId == request.ProjectId.Value);
            }

            if (request.StatusId.HasValue)
            {
                query = query.Where(c => c.StatusId == request.StatusId.Value);
            }

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(c => c.Url.Contains(request.SearchTerm));
            }

            return query;
        }
    }
}
