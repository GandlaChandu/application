using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IJobService
    {
        public Task<Result<int>> AddJobAsync(JobDTO jobDTO);
        public Task<Result<int>> UpdateJobAsync(JobDTO jobDTO);
        public Task<Result<ListResult<JobListDTO>>> GetAllJobsAsync(JobListRequest jobListRequest);
        public Task<Result<JobDTO>> GetByIdAsync(int jobId);
        public Task<Result<bool>> DeleteJobAsync(int jobId);
        public Task<Result<bool>> TriggerJobAsync(int jobId);
    }
}
