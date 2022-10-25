using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository
{
    public class StaticScanRepository : CodeAnalyzerBaseRepository<StaticScan>, IStaticScanRepository
    {
        public StaticScanRepository(CodeAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<ListResult<StaticScanDTO>> GetAllStaticScansAsync(StaticScanListRequest request, List<int> accessibleProjects)
        {
            IQueryable<StaticScan> query = GetAll(c => !c.IsDeleted, c => c.Status);

            if (accessibleProjects != null)
            {
                query = query.Where(c => accessibleProjects.Contains(c.ProjectId));
            }

            query = ApplyFilters(request, query);

            query = query.OrderByDescending(c => c.Id);

            ListResult<StaticScan> pagedResult = await QueryUtility<StaticScan>.GetQueryResultAsync(query, request.ListParameter);

            return new ListResult<StaticScanDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToStaticScanDTOList()
            };
        }

        public async Task<StaticScanDTO> GetStaticScanAsync(int scanId)
        {
            StaticScan staticScanEntiy = await GetAsync(c => c.Id == scanId);
            return staticScanEntiy.ToStaticScanDTO();
        }

        public async Task<StaticScanDTO> GetStaticScanByStaticScanDetailsIdAsync(int projectStaticScanDetailsId)
        {
            StaticScan staticScanEntiy = await GetAsync(c => c.ProjectStaticScanDetailsId == projectStaticScanDetailsId);
            return staticScanEntiy.ToStaticScanDTO();
        }

        public async Task<StaticScanDTO> GetStaticScanByTaskIdAsync(string taskId)
        {
            StaticScan staticScanEntiy = await GetAsync(c => c.SonarQubeAnalysisTaskId == taskId);
            return staticScanEntiy.ToStaticScanDTO();
        }

        public async Task<int> AddStaticScanAsync(StaticScanDTO staticScanDTO)
        {
            StaticScan staticScanEntity = staticScanDTO.ToStaticScanEntity();
            await AddAsync(staticScanEntity);
            return staticScanEntity.Id;
        }

        public async Task<int> UpdateStaticScanAsync(StaticScanDTO staticScanDTO)
        {
            StaticScan staticScanEntity = staticScanDTO.ToStaticScanEntity();
            await UpdateAsync(staticScanEntity);
            return staticScanEntity.Id;
        }

        private IQueryable<StaticScan> ApplyFilters(StaticScanListRequest request, IQueryable<StaticScan> query)
        {
            if (request.ProjectId.HasValue)
            {
                query = query.Where(c => c.ProjectId == request.ProjectId.Value);
            }

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(c => c.Url.Contains(request.SearchTerm));
            }

            return query;
        }
    }
}
