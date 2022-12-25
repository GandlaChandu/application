using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaticScanReportController : BaseController
    {
        private readonly IStaticScanReportService _staticScanReportService;

        public StaticScanReportController(IStaticScanReportService staticScanReportService)
        {
            _staticScanReportService = staticScanReportService;
        }

        [HttpPost("DownloadReport/{scanId}/{reportFormat}")]
        public async Task<IActionResult> DownloadReport(int scanId, ReportFormat reportFormat)
        {
            var reportResult = await _staticScanReportService.GenerateReportAsync(scanId, reportFormat);

            return File(reportResult.Value.Bytes, reportResult.Value.MimeType, reportResult.Value.FileName);
        }

        [HttpPost("DownloadReportBySonarProjectKey/{sonarProjectKey}/{reportFormat}")]
        public async Task<IActionResult> DownloadReport(string sonarProjectKey, ReportFormat reportFormat)
        {
            var reportResult = await _staticScanReportService.GenerateReportAsync(sonarProjectKey, reportFormat);

            return File(reportResult.Value.Bytes, reportResult.Value.MimeType, reportResult.Value.FileName);
        }
    }
}