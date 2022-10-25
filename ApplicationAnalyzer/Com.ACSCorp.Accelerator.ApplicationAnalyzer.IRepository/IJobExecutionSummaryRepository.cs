using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobExecutionSummary;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IJobExecutionSummaryRepository : IBaseRepository
    {
        public Task<int> AddJobExecutionAsync(JobExecutionSummaryDTO jobExecutionSummaryDTO);
        public Task<int> UpdateJobExecutionAsync(JobExecutionSummaryDTO jobExecutionSummaryDTO);
        public Task<JobExecutionSummaryDTO> GetLatestByJobIdAsync(int jobId);
    }
}
