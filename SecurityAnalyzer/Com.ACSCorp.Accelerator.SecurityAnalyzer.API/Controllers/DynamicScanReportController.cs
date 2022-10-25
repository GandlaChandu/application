using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicScanReportController : ControllerBase
    {
        private readonly IDynamicScanReportService _dynamicScanReportService;

        public DynamicScanReportController(IDynamicScanReportService dynamicScanReportService)
        {
            _dynamicScanReportService = dynamicScanReportService;
        }

        [HttpPost("DownloadReport/{scanId}/{reportFormat}")]
        public async Task<IActionResult> DownloadReport(int scanId, ReportFormat reportFormat)
        {
            var reportResult = await _dynamicScanReportService.GenerateReportAsync(scanId, reportFormat);

            return File(reportResult.Value.Bytes, reportResult.Value.MimeType, reportResult.Value.FileName);
        }
    }
}