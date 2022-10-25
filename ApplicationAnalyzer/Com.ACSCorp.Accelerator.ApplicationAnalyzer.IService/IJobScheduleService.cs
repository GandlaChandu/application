using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IJobScheduleService
    {
        public Task<Result<List<JobScheduleDTO>>> GetAllActiveJobSchedulesAsync();
        public Task<Result<int>> GetFutureActiveJobSchedulesCountAsync(DashboardRequest dashboardRequest);
    }
}
