using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobExecutionSummary;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class JobExecutionSummaryService : IJobExecutionSummaryService
    {
        #region Variables

        private readonly IJobExecutionSummaryRepository _jobExecutionSummaryRepository;

        #endregion Variables

        #region Constructors

        public JobExecutionSummaryService(IJobExecutionSummaryRepository jobExecutionSummaryRepository)
        {
            _jobExecutionSummaryRepository = jobExecutionSummaryRepository;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<int>> AddJobExecutionAsync(JobExecutionSummaryDTO jobExecutionSummaryDTO)
        {
            int jobExecutionSummaryId = await _jobExecutionSummaryRepository.AddJobExecutionAsync(jobExecutionSummaryDTO);

            return Result.Ok(jobExecutionSummaryId);
        }

        public async Task<Result<JobExecutionSummaryDTO>> GetLatestByJobIdAsync(int jobId)
        {
            JobExecutionSummaryDTO jobExecutionSummaryDTO = await _jobExecutionSummaryRepository.GetLatestByJobIdAsync(jobId);

            return Result.Ok(jobExecutionSummaryDTO);
        }

        public async Task<Result<int>> UpdateJobExecutionAsync(JobExecutionSummaryDTO jobExecutionSummaryDTO)
        {
            int jobExecutionSummaryId = await _jobExecutionSummaryRepository.UpdateJobExecutionAsync(jobExecutionSummaryDTO);

            return Result.Ok(jobExecutionSummaryId);
        }

        #endregion Public Methods
    }
}
