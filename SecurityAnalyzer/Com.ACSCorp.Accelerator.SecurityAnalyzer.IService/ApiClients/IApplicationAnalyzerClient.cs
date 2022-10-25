using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients
{
    public interface IApplicationAnalyzerClient
    {
        /// <summary>
        /// Get Project By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<ProjectDTO> GetProjectByIdAsync(int id);
        public Task<bool> SaveVulnerabilityStatistics(List<VulnerabilityStatisticsDTO> vulnerabilityStatisticsDTOs);
        public Task<List<IdNamePair>> GetProjectNamesByIdsAsync(IEnumerable<int> projectIds);
        public Task<UserDTO> GetUserAsync(int id);
        public Task<List<CweInfoDTO>> GetCweInfoByIdsAsync(IEnumerable<int> cweIds);
    }
}
