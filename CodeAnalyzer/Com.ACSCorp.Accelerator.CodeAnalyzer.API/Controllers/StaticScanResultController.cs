using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaticScanResultController : BaseController
    {
        private readonly IStaticScanResultService _staticScanResultService;

        public StaticScanResultController(IStaticScanResultService staticScanResultService)
        {
            _staticScanResultService = staticScanResultService;
        }

        [HttpPost("GetStaticScanResults/{scanId}")]
        public async Task<IActionResult> GetStaticScanResults(int scanId, Pagination pagination = null)
        {
            Result<ListResult<SonarIssueDTO>> result = await _staticScanResultService.GetStaticScanResultsAsync(scanId, pagination);

            return GetActionResult(result);
        }

        [HttpGet("GetStaticScanOverview/{scanId}")]
        public async Task<IActionResult> GetStaticScanOverview(int scanId)
        {
            Result<StaticScanOverviewDTO> result = await _staticScanResultService.GetStaticScanOverviewAsync(scanId);

            return GetActionResult(result);
        }
    }
}