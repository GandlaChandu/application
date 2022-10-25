using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IJobScanTypeService
    {
        public Task<Result<int>> AddJobScanTypesAsync(List<JobScanTypeDTO> jobScanTypeDTOs);
        public Task<Result<int>> UpdateJobScanTypesAsync(List<JobScanTypeDTO> jobScanTypeDTOs);
    }
}
