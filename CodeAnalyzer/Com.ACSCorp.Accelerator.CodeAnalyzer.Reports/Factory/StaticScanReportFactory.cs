using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Interfaces;

using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Factory
{
    public class StaticScanReportFactory
    {
        public IStaticScanReport GetReport(ReportFormat reportFormat)
        {
            switch (reportFormat)
            {
                case ReportFormat.Pdf:
                    return new StaticScanPdfReport();
                case ReportFormat.Excel:
                    return new StaticScanExcelReport();
                default:
                    throw new NotSupportedException($"{reportFormat} is not supported");
            }
        }
    }
}
