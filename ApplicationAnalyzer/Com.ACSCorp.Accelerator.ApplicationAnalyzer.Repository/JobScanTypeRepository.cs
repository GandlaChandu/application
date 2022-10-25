using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class JobScanTypeRepository : BaseRepository<JobScanType>, IJobScanTypeRepository
    {
        #region Constructors

        public JobScanTypeRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        #endregion Constructors

        #region Public Methods

        public async Task<int> AddJobScanTypesAsync(List<JobScanTypeDTO> jobScanTypeDTOs)
        {
            await _dbContext.Set<JobScanType>()
                .AddRangeAsync(jobScanTypeDTOs.ToJobScanTypeEntityList());
            await SaveChangesAsync();

            return jobScanTypeDTOs.Count;
        }

        public async Task<int> UpdateJobScanTypesAsync(List<JobScanTypeDTO> jobScanTypeDTOs)
        {
            List<JobScanType> jobScanTypes = jobScanTypeDTOs.ToJobScanTypeEntityList();

            foreach (var jobScanType in jobScanTypes)
            {
                _dbContext.Entry(jobScanType).State = EntityState.Modified;
            }

            _dbContext.Set<JobScanType>().UpdateRange(jobScanTypes);
            await SaveChangesAsync();

            return jobScanTypes.Count;
        }

        #endregion Public Methods
    }
}
