using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService
{
    public interface IDynamicScanReportService
    {
        public Task<Result<Report>> GenerateReportAsync(int scanId, ReportFormat reportFormat = ReportFormat.Excel, bool verifyAccess = true);
    }
}
