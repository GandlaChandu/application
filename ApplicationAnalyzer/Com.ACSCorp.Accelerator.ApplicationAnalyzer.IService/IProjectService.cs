using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IProjectService
    {
        public Task<Result<ListResult<ProjectDTO>>> GetAllProjectsAsync(ProjectListRequest request);
        public Task<Result<ProjectDTO>> GetProjectAsync(int projectId);
        public Task<Result<int>> AddProjectAsync(ProjectDTO project);
        public Task<Result<int>> UpdateProjectAsync(ProjectDTO project);
        public Task<Result<List<IdNamePair>>> GetAllActiveProjectsByDivisionIdAsync(int divisionId, ScanType? scanType);
        public Task<Result<List<IdNamePair>>> GetNamesByIdsAsync(int[] ids);
        public Result<List<IdNamePair>> GetStaticScanTypes();
        public Result<List<IdNamePair>> GetScanTypes();
        public Result<List<IdNamePair>> GetSourceCodeTypes();
        public Result<List<IdNamePair>> GetSourceControlTypes();

        /// <summary>
        /// Get project by key
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public Task<Result<ProjectDTO>> GetProjectByKeyAsync(Guid key);

        /// <summary>
        /// Gets Ticket system types
        /// </summary>
        /// <returns></returns>
        public Result<List<IdNamePair>> GetTicketSystemTypes();
        public Task<Result<List<int>>> GetClientIdsByProjectIdsAsync(List<int> accessibleProjectIds);
    }
}
