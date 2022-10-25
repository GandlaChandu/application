using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository
{
    public class DynamicScanDetailsRepository : SecurityAnalyzerBaseRepository<DynamicScanDetails>, IDynamicScanDetailsRepository
    {
        #region Constructor
        public DynamicScanDetailsRepository(SecurityAnalyzerContext dbContext) : base(dbContext)
        {
        }
        #endregion

        /// <summary>
        /// Save project dynamic scan details
        /// </summary>
        /// <param name="dynamicScanDetails"></param>
        /// <returns></returns>
        public async Task<int> AddDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails)
        {
            DynamicScanDetails scanDetails = dynamicScanDetails.ToDynamicScanDetailsEntity();
            await AddAsync(scanDetails);
            return scanDetails.Id;
        }

        /// <summary>
        /// Update project dynamic scan details
        /// </summary>
        /// <param name="dynamicScanDetails"></param>
        /// <returns></returns>
        public async Task<bool> UpdateDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails)
        {
            DynamicScanDetails scanDetails = dynamicScanDetails.ToDynamicScanDetailsEntity();
            await UpdateAsync(scanDetails);
            return true;
        }

        /// <summary>
        /// Get list of Dynamic scan details based on project
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<DynamicScanDetailsDTO> GetDynamicScanDetailsByProjectIdAsync(int projectId)
        {
            var result = await GetAsync(c => !c.IsDeleted && c.ProjectId == projectId);
            return result.ToDynamicScanDetailsDTO();
        }

        public async Task<List<ListItem<int>>> GetProjectDynamicScanUrlListAsync(List<int> projectIdList)
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
        /// GetDynamicScanDetailsByIdAsync
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<DynamicScanDetailsDTO> GetDynamicScanDetailsByIdAsync(int id)
        {
            var result = await GetAsync(c => c.Id == id);
            return result.ToDynamicScanDetailsDTO();
        }
    }
}
