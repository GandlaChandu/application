using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobExecutionSummary;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobExecutionSummaryController : BaseController
    {
        private readonly IJobExecutionSummaryService _jobExecutionSummaryService;

        public JobExecutionSummaryController(IJobExecutionSummaryService jobExecutionSummaryService)
        {
            _jobExecutionSummaryService = jobExecutionSummaryService;
        }

        [HttpPost]
        public async Task<IActionResult> AddJobLog(JobExecutionSummaryDTO jobExecutionSummaryDTO)
        {
            Result<int> result = await _jobExecutionSummaryService.AddJobExecutionAsync(jobExecutionSummaryDTO);

            return GetActionResult(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateJobLog(JobExecutionSummaryDTO jobExecutionSummaryDTO)
        {
            Result<int> result = await _jobExecutionSummaryService.UpdateJobExecutionAsync(jobExecutionSummaryDTO);

            return GetActionResult(result);
        }

        [HttpGet("GetLatestExecution/{jobId}")]
        public async Task<IActionResult> GetLatestExecution(int jobId)
        {
            Result<JobExecutionSummaryDTO> result = await _jobExecutionSummaryService.GetLatestByJobIdAsync(jobId);

            return GetActionResult(result);
        }
    }
}