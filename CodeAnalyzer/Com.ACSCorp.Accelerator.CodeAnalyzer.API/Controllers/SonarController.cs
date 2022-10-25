using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Interfaces;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SonarController : BaseController
    {
        private readonly ISonarQubeClient _sonarQubeClient;

        public SonarController(ISonarQubeClient sonarQubeClient)
        {
            _sonarQubeClient = sonarQubeClient;
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("CreateProject/{key}")]
        public async Task<IActionResult> CreateProject(string key)
        {
            Result result = await _sonarQubeClient.AddProjectAsync(key);

            return GetActionResult(result);
        }
    }
}