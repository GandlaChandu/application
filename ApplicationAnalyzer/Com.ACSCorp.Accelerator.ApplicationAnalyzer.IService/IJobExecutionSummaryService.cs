using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobExecutionSummary;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IJobExecutionSummaryService
    {
        public Task<Result<int>> AddJobExecutionAsync(JobExecutionSummaryDTO jobExecutionSummaryDTO);
        public Task<Result<int>> UpdateJobExecutionAsync(JobExecutionSummaryDTO jobExecutionSummaryDTO);
        public Task<Result<JobExecutionSummaryDTO>> GetLatestByJobIdAsync(int jobId);
    }
}
