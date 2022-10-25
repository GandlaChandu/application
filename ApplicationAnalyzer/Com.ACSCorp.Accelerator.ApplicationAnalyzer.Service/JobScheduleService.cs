using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class JobScheduleService : IJobScheduleService
    {
        #region Variables

        private readonly IJobScheduleRepository _jobScheduleRepository;

        #endregion Variables

        #region Constructors

        public JobScheduleService(IJobScheduleRepository jobScheduleRepository)
        {
            _jobScheduleRepository = jobScheduleRepository;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<List<JobScheduleDTO>>> GetAllActiveJobSchedulesAsync()
        {
            List<JobScheduleDTO> jobSchedulesResult = await _jobScheduleRepository.GetAllActiveJobSchedulesAsync();
            return Result.Ok(jobSchedulesResult);
        }

        public async Task<Result<int>> GetFutureActiveJobSchedulesCountAsync(DashboardRequest dashboardRequest)
        {
            int scansScheduled = await _jobScheduleRepository.GetFutureActiveJobSchedulesCountAsync(dashboardRequest);
            return Result.Ok(scansScheduled);
        }

        #endregion Public Methods
    }
}
