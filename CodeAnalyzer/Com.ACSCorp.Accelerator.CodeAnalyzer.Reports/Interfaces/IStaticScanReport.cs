using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Models;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Interfaces
{
    public interface IStaticScanReport
    {
        public Report Generate(StaticScanReportModel staticScanReportModel);
    }
}
