using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : BaseController
    {
        private readonly IDataService _dataService;

        public DataController(IDataService dataService)
        {
            _dataService = dataService;
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("GetAllRules")]
        public async Task<IActionResult> GetAllRules(RuleListRequestModel request)
        {
            Result<ListResult<SonarRuleDTO>> result = await _dataService.GetAllRulesAsync(request);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpGet("GetAllSeverities")]
        public IActionResult GetAllSeverities()
        {
            Result<List<KeyValuePair<string, string>>> result = _dataService.GetAllSeverities();

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpGet("GetAllVulnerabilities")]
        public IActionResult GetAllVulnerabilities()
        {
            Result<List<KeyValuePair<string, string>>> result = _dataService.GetAllVulnerabilities();

            return GetActionResult(result);
        }
    }
}