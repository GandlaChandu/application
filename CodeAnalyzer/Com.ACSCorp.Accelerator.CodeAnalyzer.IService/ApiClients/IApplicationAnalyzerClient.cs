using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients
{
    public interface IApplicationAnalyzerClient
    {
        /// <summary>
        /// Get Project By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<ProjectDTO> GetProjectByIdAsync(int id);

        /// <summary>
        /// Get project name by id
        /// </summary>
        /// <param name="projectIds"></param>
        /// <returns></returns>
        public Task<List<IdNamePair>> GetProjectNamesByIdsAsync(IEnumerable<int> projectIds);

        /// <summary>
        /// Get client by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<ClientDTO> GetClientByIdAsync(int id);

        public Task<bool> SaveVulnerabilityStatistics(List<VulnerabilityStatisticsDTO> vulnerabilityStatisticsDTOs);
        
        public Task<CurrentUserDTO> GetUserAsync(int id);

        public Task<List<CweInfoDTO>> GetCweInfoByIdsAsync(IEnumerable<int> cweIds);
    }
}
