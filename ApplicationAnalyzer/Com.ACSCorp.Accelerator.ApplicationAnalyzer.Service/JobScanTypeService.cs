using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class JobScanTypeService : IJobScanTypeService
    {
        #region Variables

        private readonly IJobScanTypeRepository _jobScanTypeRepository;

        #endregion Variables

        #region Constructors

        public JobScanTypeService(IJobScanTypeRepository jobScanTypeRepository)
        {
            _jobScanTypeRepository = jobScanTypeRepository;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<int>> AddJobScanTypesAsync(List<JobScanTypeDTO> jobScanTypeDTOs)
        {
            int recordsAdded = await _jobScanTypeRepository.AddJobScanTypesAsync(jobScanTypeDTOs);
            return Result.Ok(recordsAdded);
        }

        public async Task<Result<int>> UpdateJobScanTypesAsync(List<JobScanTypeDTO> jobScanTypeDTOs)
        {
            int recordsAdded = await _jobScanTypeRepository.UpdateJobScanTypesAsync(jobScanTypeDTOs);
            return Result.Ok(recordsAdded);
        }

        #endregion Public Methods
    }
}
