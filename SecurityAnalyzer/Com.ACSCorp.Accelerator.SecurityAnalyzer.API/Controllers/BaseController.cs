using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.AspNetCore.Mvc;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected IActionResult GetActionResult<T>(Result<T> result)
        {
            if (!result.IsSucceeded)
            {
                return BadRequest(result.GetErrorString());
            }

            return Ok(result.Value);
        }

        protected IActionResult GetActionResult(Result result)
        {
            if (!result.IsSucceeded)
            {
                return BadRequest(result.GetErrorString());
            }

            return Ok();
        }
    }
}