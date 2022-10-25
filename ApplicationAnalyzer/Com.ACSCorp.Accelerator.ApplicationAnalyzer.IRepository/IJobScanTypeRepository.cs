using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IJobScanTypeRepository : IBaseRepository
    {
        public Task<int> AddJobScanTypesAsync(List<JobScanTypeDTO> jobScanTypeDTOs);
        public Task<int> UpdateJobScanTypesAsync(List<JobScanTypeDTO> jobScanTypeDTOs);
    }
}
