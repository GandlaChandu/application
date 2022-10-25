using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CommonEnum = Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class ProjectRepository : BaseRepository<Project>, IProjectRepository
    {
        #region Variables

        protected new readonly ApplicationAnalyzerContext _dbContext;

        #endregion Variables

        #region Constructors

        public ProjectRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        #endregion Constructors

        #region Public Methods

        /// <summary>
        /// Get all projects based on pagination
        /// </summary>
        /// <param name="pagination"></param>
        /// <returns></returns>
        public async Task<ListResult<ProjectDTO>> GetAllProjectsAsync(ProjectListRequest request, List<int> accessibleProjects)
        {
            var query = GetAllProject();

            query = ApplyUserAccessibleProjectsFilter(query, accessibleProjects);

            query = ApplyFilters(request, query).OrderByDescending(c => c.Id);

            var queryResult = await QueryUtility<Project>.GetQueryResultAsync(query, request.ListParameter);

            return new ListResult<ProjectDTO>
            {
                Total = queryResult.Total,
                Items = queryResult.Items.ToProjectDTOList()
            };
        }

        /// <summary>
        /// Get project by id
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task<ProjectDTO> GetProjectAsync(int projectId)
        {
            var entity = await GetProjectById(projectId).FirstOrDefaultAsync();

            return entity.ToProjectDTO();
        }

        /// <summary>
        /// Get project by Key
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<ProjectDTO> GetProjectByKeyAsync(Guid key)
        {
            var entity = await GetProjectByKey(key).FirstOrDefaultAsync();

            return entity.ToProjectDTO();
        }

        /// <summary>
        /// Get project exists with given name
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task<ProjectDTO> GetProjectByNameAsync(string name)
        {
            Project project = await GetAsync(c => c.Name.ToLower() == name.ToLower()
                && !c.IsDeleted);

            if (project != null)
            {
                return project.ToProjectDTO();
            }
            return null;
        }

        /// <summary>
        /// Save Project
        /// </summary>
        /// <param name="projectDTO"></param>
        /// <returns></returns>
        public async Task<int> AddProjectAsync(ProjectDTO projectDTO)
        {
            Project project = projectDTO.ToProjectEntity();
            await AddAsync(project);
            return project.Id;
        }

        /// <summary>
        /// Update project
        /// </summary>
        /// <param name="projectDTO"></param>
        /// <returns></returns>
        public async Task<int> UpdateProjectAsync(ProjectDTO projectDTO)
        {
            Project project = projectDTO.ToProjectEntity();
            await UpdateAsync(project);
            return project.Id;
        }

        /// <summary>
        /// Gets active projects by division id and scan type
        /// </summary>
        /// <param name="divisionId"></param>
        /// <param name="scanType"></param>
        /// <returns></returns>
        public async Task<List<IdNamePair>> GetAllActiveProjectsByDivisionIdAsync(int divisionId, CommonEnum.ScanType? scanType, List<int> accessibleProjects)
        {
            IQueryable<Project> query = GetAll(c => c.DivisionId == divisionId
                    && c.IsActive && !c.IsDeleted);

            query = ApplyUserAccessibleProjectsFilter(query, accessibleProjects);

            List<IdNamePair> activeProjects = await query.Select(c => new IdNamePair
            {
                Id = c.Id,
                Name = c.Name
            }).OrderBy(s => s.Name).ToListAsync();

            return activeProjects;
        }

        public async Task<List<IdNamePair>> GetNamesByIds(int[] ids)
        {
            IQueryable<Project> query = GetAll()
                                        .Where(c => ids.Contains(c.Id)
                                            && !c.IsDeleted)
                                        .AsNoTracking();

            List<IdNamePair> projects = await query.Select(c => new IdNamePair
            {
                Id = c.Id,
                Name = c.Name
            })
            .ToListAsync();

            return projects;
        }

        public async Task<List<int>> GetClientIdsByProjectIdsAsync(List<int> accessibleProjectIds)
        {
            if (accessibleProjectIds != null && accessibleProjectIds.Count > 0)
            {
                return await GetAllProject()
                    .Where(c => accessibleProjectIds.Contains(c.Id))
                    .Select(c => c.Division.ClientId)
                    .ToListAsync();
            }
            return null;
        }

        #endregion Public Methods

        #region Private Methods

        private IQueryable<Project> GetProjectById(int projectId)
        {
            return _dbContext.Project.AsNoTracking()
                .Include(c => c.Division)
                    .ThenInclude(d => d.Client)
                .Where(c => c.Id == projectId);
        }

        private IQueryable<Project> GetProjectByKey(Guid key)
        {
            return _dbContext.Project.AsNoTracking()
                .Include(c => c.Division)
                    .ThenInclude(d => d.Client)
                .Where(c => c.Key == key);
        }

        private IQueryable<Project> GetAllProject()
        {
            return _dbContext.Project.AsNoTracking()
                .Include(c => c.Division)
                    .ThenInclude(d => d.Client)
                .Where(c => !c.IsDeleted);
        }

        private IQueryable<Project> ApplyFilters(ProjectListRequest request, IQueryable<Project> query)
        {
            if (request.ClientId.HasValue)
            {
                query = query.Where(c => c.Division.ClientId == request.ClientId.Value);
            }

            if (request.DivisionId.HasValue)
            {
                query = query.Where(c => c.DivisionId == request.DivisionId.Value);
            }

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(c => c.Name.Contains(request.SearchTerm));
            }

            return query;
        }

        private IQueryable<Project> ApplyUserAccessibleProjectsFilter(IQueryable<Project> query, List<int> accessibleProjects)
        {
            if (accessibleProjects != null)
            {
                query = query.Where(c => accessibleProjects.Contains(c.Id));
            }

            return query;
        }

        #endregion Private Methods
    }
}
