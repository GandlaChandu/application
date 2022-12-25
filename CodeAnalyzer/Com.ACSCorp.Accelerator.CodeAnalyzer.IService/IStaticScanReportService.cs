using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IStaticScanReportService
    {
        public Task<Result<Report>> GenerateReportAsync(int id, ReportFormat reportFormat = ReportFormat.Excel, bool verifyAccess = true);
        public Task<Result<Report>> GenerateReportAsync(string projectKey, ReportFormat reportFormat = ReportFormat.Excel);
    }
}
