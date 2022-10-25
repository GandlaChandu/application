using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class JobRepository : BaseRepository<Job>, IJobRepository
    {
        #region Constructors

        public JobRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        #endregion Constructors

        #region Public Methods

        public async Task<int> AddJobAsync(JobDTO jobDTO)
        {
            Job job = jobDTO.ToJobEntity();
            await AddAsync(job);

            return job.Id;
        }

        public async Task<int> UpdateJobAsync(JobDTO jobDTO)
        {
            Job job = jobDTO.ToJobEntity();
            await UpdateAsync(job);

            return job.Id;
        }

        public async Task<ListResult<JobListDTO>> GetAllJobsAsync(JobListRequest jobListRequest, List<int> accessibleProjects)
        {
            var query = GetAll(c => !c.IsDeleted, c => c.Project.Division.Client, c => c.JobSchedule, c => c.JobScanType);

            query = ApplyUserAccessibleProjectsFilter(query, accessibleProjects);

            query = query.OrderByDescending(c => c.Id);

            var pagedResult = await QueryUtility<Job>.GetQueryResultAsync(query, jobListRequest.ListParameter);

            return new ListResult<JobListDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToJobListDTOs()
            };
        }

        public async Task<JobDTO> GetByIdAsync(int jobId)
        {
            Job job = await _dbContext.Set<Job>()
                .AsNoTracking()
                .Where(c => c.Id == jobId)
                .Include(c => c.JobScanType)
                .Include(c => c.JobSchedule)
                .Include(c => c.Project)
                    .ThenInclude(p => p.Division)
                        .ThenInclude(d => d.Client)
                .FirstOrDefaultAsync();

            return job.ToJobDTO();
        }

        public async Task<JobDTO> GetByNameAsync(string name)
        {
            Job job = await GetAsync(c => !c.IsDeleted && c.Name.Equals(name));

            return job.ToJobDTO();
        }

        #endregion Public Methods

        #region Private Methods

        private IQueryable<Job> ApplyUserAccessibleProjectsFilter(IQueryable<Job> query, List<int> accessibleProjects)
        {
            if (accessibleProjects != null)
            {
                query = query.Where(c => accessibleProjects.Contains(c.ProjectId));
            }

            return query;
        }

        #endregion Private Methods
    }
}
