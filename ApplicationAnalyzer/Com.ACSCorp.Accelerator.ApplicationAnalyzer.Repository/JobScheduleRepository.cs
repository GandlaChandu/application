using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class JobScheduleRepository : BaseRepository<JobSchedule>, IJobScheduleRepository
    {
        #region Constructors

        public JobScheduleRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        #endregion Constructors

        #region Public Methods

        public async Task<int> AddJobScheduleAsync(JobScheduleDTO jobScheduleDTO)
        {
            JobSchedule jobSchedule = jobScheduleDTO.ToJobScheduleEntity();
            await AddAsync(jobSchedule);

            return jobSchedule.Id;
        }

        public async Task<int> UpdateJobScheduleAsync(JobScheduleDTO jobScheduleDTO)
        {
            JobSchedule jobSchedule = jobScheduleDTO.ToJobScheduleEntity();
            await UpdateAsync(jobSchedule);

            return jobSchedule.Id;
        }

        public async Task<List<JobScheduleDTO>> GetAllActiveJobSchedulesAsync()
        {
            var jobSchedules = await GetAllActiveSchedules().ToListAsync();

            return jobSchedules.ToJobScheduleDTOs();
        }

        public async Task<int> GetFutureActiveJobSchedulesCountAsync(DashboardRequest dashboardRequest)
        {
            IQueryable<JobSchedule> query = GetFutureActiveSchedules();
            query = ApplyFilters(query, dashboardRequest);
            int futureActiveSchedulesCount = await query.CountAsync();

            return futureActiveSchedulesCount;
        }

        public async Task<JobScheduleDTO> GetByJobIdAsync(int jobId)
        {
            JobSchedule jobSchedule = await GetAsync(c => c.JobId == jobId);

            return jobSchedule.ToJobScheduleDTO();
        }

        #endregion Public Methods

        #region Private Methods

        private IQueryable<JobSchedule> GetAllActiveSchedules()
        {
            DateTime today = DateTime.Now.Date;

            IQueryable<JobSchedule> query = GetAll(c => c.IsActive
                && !c.Job.IsDeleted
                && !string.IsNullOrWhiteSpace(c.CronSchedule)
                && c.StartDate.Date <= today
                && c.EndDate.Date >= today);
            return query;
        }

        private IQueryable<JobSchedule> GetFutureActiveSchedules()
        {
            DateTime today = DateTime.Now.Date;

            IQueryable<JobSchedule> query = GetAll(c => c.IsActive
                && !c.Job.IsDeleted
                && !string.IsNullOrWhiteSpace(c.CronSchedule)
                && c.StartDate.Date >= today);
            return query;
        }

        private IQueryable<JobSchedule> ApplyFilters(IQueryable<JobSchedule> query, DashboardRequest dashboardRequest)
        {
            if (dashboardRequest.ProjectId > 0)
            {
                query = query.Where(c => c.Job.ProjectId == dashboardRequest.ProjectId);
            }

            else if (dashboardRequest.DivisionId > 0)
            {
                query = query.Where(c => c.Job.Project.DivisionId == dashboardRequest.DivisionId);
            }

            else if (dashboardRequest.ClientId > 0)
            {
                query = query.Where(c => c.Job.Project.Division.ClientId == dashboardRequest.ClientId);
            }

            if (dashboardRequest.ScanType.HasValue && dashboardRequest.ScanType > 0)
            {
                query = query.Where(c => c.Job.JobScanType.Any(c => c.ScanTypeId == Convert.ToInt16(dashboardRequest.ScanType.Value)));
            }

            return query;
        }

        #endregion Private Methods
    }
}
