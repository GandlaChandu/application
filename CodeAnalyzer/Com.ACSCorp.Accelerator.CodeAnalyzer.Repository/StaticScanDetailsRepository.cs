using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository
{
    public class StaticScanDetailsRepository : CodeAnalyzerBaseRepository<StaticScanDetails>, IStaticScanDetailsRepository
    {
        public StaticScanDetailsRepository(CodeAnalyzerContext dbContext) : base(dbContext)
        {
        }

        /// <summary>
        /// Save project static scan details
        /// </summary>
        /// <param name="staticScanDetails"></param>
        /// <returns></returns>
        public async Task<int> AddStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails)
        {
            StaticScanDetails scanDetails = staticScanDetails.ToStaticScanDetailsEntity();
            await AddAsync(scanDetails);
            return scanDetails.Id;
        }

        /// <summary>
        /// Update project static scan details
        /// </summary>
        /// <param name="staticScanDetails"></param>
        /// <returns></returns>
        public async Task<int> UpdateStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails)
        {
            StaticScanDetails scanDetails = staticScanDetails.ToStaticScanDetailsEntity();
            await UpdateAsync(scanDetails);
            return scanDetails.Id;
        }

        /// <summary>
        /// Update project static scan types
        /// </summary>
        /// <param name="types"></param>
        /// <param name="staticScanId"></param>
        /// <returns></returns>
        public async Task<int> UpdateStaticScanTypesAsync(List<StaticScanTypeDTO> types)
        {
            List<StaticScanType> scanTypes = types.ToStaticScanTypeEntityList();

            foreach (var item in scanTypes)
            {
                _dbContext.Entry(item).State = EntityState.Modified;
            }

            _dbContext.StaticScanType.UpdateRange(scanTypes);
            await SaveChangesAsync();
            return scanTypes.Count;
        }

        /// <summary>
        /// Get Project StaticScan details by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public StaticScanDetailsDTO GetStaticScanDetailById(int id)
        {
            StaticScanDetails staticScanDetails = _dbContext.StaticScanDetails.Include(s => s.StaticScanType).AsNoTracking().FirstOrDefault(s => s.Id == id);

            return staticScanDetails.ToStaticScanDetailsDTO();
        }

        /// <summary>
        /// Get Project StaticScan details by project Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public async Task<StaticScanDetailsDTO> GetStaticScanDetailsByProjectIdAsync(int projectId)
        {
            StaticScanDetails staticScanDetails =
                 await _dbContext.StaticScanDetails.AsNoTracking()
                    .Where(c => !c.IsDeleted)
                    .Include(s => s.StaticScanType)
                    .OrderByDescending(c => c.Id)
                    .FirstOrDefaultAsync(s => s.ProjectId == projectId);

            return staticScanDetails.ToStaticScanDetailsDTO();
        }

        public async Task<List<ListItem<int>>> GetProjectStaticScanUrlListAsync(List<int> projectIdList)
        {
            var query = GetAll(c => !c.IsDeleted && projectIdList.Contains(c.ProjectId));
            List<ListItem<int>> projectURLList = await query
                .Select(c => new ListItem<int>
                {
                    Value = c.ProjectId,
                    Text = c.Url
                })
                .ToListAsync();

            return projectURLList;
        }

        /// <summary>
        /// Save project static scan types
        /// </summary>
        /// <param name="types"></param>
        /// <returns></returns>
        public async Task<int> AddStaticScanTypesAsync(List<StaticScanTypeDTO> types)
        {
            await _dbContext.StaticScanType.AddRangeAsync(types.ToStaticScanTypeEntityList());
            await SaveChangesAsync();
            return types.Count;
        }
    }
}
