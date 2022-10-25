using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IJobRepository : IBaseRepository
    {
        public Task<int> AddJobAsync(JobDTO jobDTO);
        public Task<int> UpdateJobAsync(JobDTO jobDTO);
        public Task<ListResult<JobListDTO>> GetAllJobsAsync(JobListRequest jobListRequest, List<int> accessibleProjects);
        public Task<JobDTO> GetByIdAsync(int jobId);
        public Task<JobDTO> GetByNameAsync(string name);
    }
}
