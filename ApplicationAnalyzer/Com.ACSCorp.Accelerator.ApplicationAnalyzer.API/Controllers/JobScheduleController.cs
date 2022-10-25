using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobScheduleController : BaseController
    {
        private readonly IJobScheduleService _jobScheduleService;

        public JobScheduleController(IJobScheduleService jobScheduleService)
        {
            _jobScheduleService = jobScheduleService;
        }

        //[Authorize(Role.Admin)]
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            Result<List<JobScheduleDTO>> jobSchedulesResult = await _jobScheduleService.GetAllActiveJobSchedulesAsync();
            return GetActionResult(jobSchedulesResult);
        }
    }
}