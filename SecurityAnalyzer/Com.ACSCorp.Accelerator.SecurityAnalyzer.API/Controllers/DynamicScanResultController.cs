using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicScanResultController : BaseController
    {
        private readonly IDynamicScanResultService _dynamicScanResultService;

        public DynamicScanResultController(IDynamicScanResultService dynamicScanResultService)
        {
            _dynamicScanResultService = dynamicScanResultService;
        }

        [HttpPost("GetDynamicScanResults")]
        public async Task<IActionResult> GetDynamicScanResults(int scanId, ListParameter searchParameter = null)
        {
            var result = await _dynamicScanResultService.GetDynamicScanResultsAsync(scanId, searchParameter);

            return GetActionResult(result);
        }
    }
}