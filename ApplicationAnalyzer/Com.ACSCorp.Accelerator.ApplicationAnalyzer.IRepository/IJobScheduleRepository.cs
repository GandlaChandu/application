using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IJobScheduleRepository : IBaseRepository
    {
        public Task<int> AddJobScheduleAsync(JobScheduleDTO jobScheduleDTO);
        public Task<int> UpdateJobScheduleAsync(JobScheduleDTO jobScheduleDTO);
        public Task<List<JobScheduleDTO>> GetAllActiveJobSchedulesAsync();
        public Task<int> GetFutureActiveJobSchedulesCountAsync(DashboardRequest dashboardRequest);
        public Task<JobScheduleDTO> GetByJobIdAsync(int jobId);
    }
}
