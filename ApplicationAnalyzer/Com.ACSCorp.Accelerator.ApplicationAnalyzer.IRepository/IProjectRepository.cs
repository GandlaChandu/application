using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using CommonEnum = Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IProjectRepository : IBaseRepository
    {
        public Task<ListResult<ProjectDTO>> GetAllProjectsAsync(ProjectListRequest request, List<int> accessibleProjects);
        public Task<ProjectDTO> GetProjectAsync(int projectId);
        public Task<int> AddProjectAsync(ProjectDTO project);
        public Task<int> UpdateProjectAsync(ProjectDTO project);
        public Task<List<IdNamePair>> GetAllActiveProjectsByDivisionIdAsync(int divisionId, CommonEnum.ScanType? scanType, List<int> accessibleProjects);
        public Task<List<IdNamePair>> GetNamesByIds(int[] ids);
        public Task<ProjectDTO> GetProjectByNameAsync(string name);

        /// <summary>
        /// Get project by Key
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public Task<ProjectDTO> GetProjectByKeyAsync(Guid key);
        public Task<List<int>> GetClientIdsByProjectIdsAsync(List<int> accessibleProjectIds);
    }
}
