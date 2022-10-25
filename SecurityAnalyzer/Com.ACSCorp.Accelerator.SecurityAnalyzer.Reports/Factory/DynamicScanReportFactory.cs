using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Interfaces;

using System;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Factory
{
    public class DynamicScanReportFactory
    {
        public IDynamicScanReport GetReport(ReportFormat reportFormat)
        {
            switch (reportFormat)
            {
                case ReportFormat.Pdf:
                    return new DynamicScanPdfReport();
                case ReportFormat.Excel:
                    return new DynamicScanExcelReport();
                default:
                    throw new NotSupportedException($"{reportFormat} is not supported");
            }
        }
    }
}
