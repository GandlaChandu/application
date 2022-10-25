using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Interfaces
{
    public interface IDynamicScanReport
    {
        public Report Export(DynamicScanReportModel dynamicScanReportModel);
    }
}
