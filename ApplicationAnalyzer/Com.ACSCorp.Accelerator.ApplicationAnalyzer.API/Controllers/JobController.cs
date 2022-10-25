using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : BaseController
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [Authorize(Role.Admin, Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("GetAll")]
        public async Task<IActionResult> GetAllAsync(JobListRequest jobListRequest)
        {
            Result<ListResult<JobListDTO>> jobsResult = await _jobService.GetAllJobsAsync(jobListRequest);
            return GetActionResult(jobsResult);
        }

        [Authorize(Role.Admin, Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            Result<JobDTO> jobResult = await _jobService.GetByIdAsync(id);
            return GetActionResult(jobResult);
        }

        [Authorize(Role.Admin, Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("Post")]
        public async Task<IActionResult> AddJobAsync(JobDTO jobDTO)
        {
            Result<int> result = await _jobService.AddJobAsync(jobDTO);
            return GetActionResult(result);
        }

        [Authorize(Role.Admin, Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPut("Put")]
        public async Task<IActionResult> UpdateJobAsync(JobDTO jobDTO)
        {
            Result<int> result = await _jobService.UpdateJobAsync(jobDTO);
            return GetActionResult(result);
        }

        [Authorize(Role.Admin, Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteJobAsync(int id)
        {
            Result<bool> result = await _jobService.DeleteJobAsync(id);
            return GetActionResult(result);
        }

        //[Authorize(Role.Admin)]
        [HttpPost("Trigger/{jobId}")]
        public async Task<IActionResult> TriggerJobAsync(int jobId)
        {
            Result<bool> result = await _jobService.TriggerJobAsync(jobId);
            return GetActionResult(result);
        }
    }
}