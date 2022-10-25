using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobExecutionSummary;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class JobExecutionSummaryRepository : BaseRepository<JobExecutionSummary>, IJobExecutionSummaryRepository
    {
        #region Constructors

        public JobExecutionSummaryRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        #endregion Constructors

        #region Public Methods

        public async Task<int> AddJobExecutionAsync(JobExecutionSummaryDTO jobExecutionSummaryDTO)
        {
            JobExecutionSummary jobExecutionSummary = jobExecutionSummaryDTO.ToJobExecutionSummaryEntity();
            await AddAsync(jobExecutionSummary);

            return jobExecutionSummary.Id;
        }

        public async Task<int> UpdateJobExecutionAsync(JobExecutionSummaryDTO jobExecutionSummaryDTO)
        {
            JobExecutionSummary jobExecutionSummary = jobExecutionSummaryDTO.ToJobExecutionSummaryEntity();
            await UpdateAsync(jobExecutionSummary);

            return jobExecutionSummary.Id;
        }

        public async Task<JobExecutionSummaryDTO> GetLatestByJobIdAsync(int jobId)
        {
            JobExecutionSummary jobExecutionSummary = await GetAll(c => c.JobId == jobId)
                .OrderByDescending(c => c.StartDateTime)
                .FirstOrDefaultAsync();

            return jobExecutionSummary.ToJobExecutionSummaryDTO();
        }

        #endregion Public Methods
    }
}
