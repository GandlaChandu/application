using Com.ACSCorp.Accelerator.QueueAPI.Enque.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Models;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueueAPIController : BaseController
    {
        private readonly IQueueService _enqueAPIService;

        public QueueAPIController(IQueueService enqueAPIService)
        {
            _enqueAPIService = enqueAPIService;
        }

        [HttpPost("Post")]
        public async Task<IActionResult> EnqueAsync([FromBody] EnqueAPIModel enqueAPI)
        {
            var result = await _enqueAPIService.EnqueAsync(enqueAPI);

            return GetActionResult(result);
        }

        [HttpGet("Get")]
        public IActionResult GetPendingQueueCount()
        {
            var result = _enqueAPIService.GetPendingQueueCount();

            return GetActionResult(result);
        }
    }
}
