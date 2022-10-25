using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository
{
    public interface IStaticScanRepository : IBaseRepository
    {
        public Task<ListResult<StaticScanDTO>> GetAllStaticScansAsync(StaticScanListRequest request, List<int> accessibleProjects);

        public Task<StaticScanDTO> GetStaticScanAsync(int scanId);

        /// <summary>
        /// Get staticScan by projectStaticScanDetailsId
        /// </summary>
        /// <param name="projectStaticScanDetailsId"></param>
        /// <returns></returns>
        public Task<StaticScanDTO> GetStaticScanByStaticScanDetailsIdAsync(int projectStaticScanDetailsId);

        /// <summary>
        /// Get static scan by sonar qube analysis taskid.
        /// </summary>
        /// <param name="taskId"></param>
        /// <returns></returns>
        public Task<StaticScanDTO> GetStaticScanByTaskIdAsync(string taskId);

        /// <summary>
        /// Add Static Scan DTO
        /// </summary>
        /// <param name="staticScanDTO"></param>
        /// <returns></returns>
        public Task<int> AddStaticScanAsync(StaticScanDTO staticScanDTO);

        /// <summary>
        /// Update Static scan DTO
        /// </summary>
        /// <param name="staticScanDTO"></param>
        /// <returns></returns>
        public Task<int> UpdateStaticScanAsync(StaticScanDTO staticScanDTO);
    }
}
