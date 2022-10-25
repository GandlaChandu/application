using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;

using System;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports
{
    internal abstract class DynamicScanReportBase
    {
        protected string GetDynamicScanReportName(ReportFormat reportFormat)
        {
            string fileNameBase = Constants.DynamicScanDownloadBaseFileName;
            string fileNameSuffix = DateTime.Now.ToString(Constants.DynamicScanDownloadLongYearFormat);
            string fileExtensionIncludingPeriod = GetFileExtension(reportFormat);

            return $"{fileNameBase}{fileNameSuffix}{fileExtensionIncludingPeriod}";
        }

        private string GetFileExtension(ReportFormat reportFormat)
        {
            string fileExtension;

            switch (reportFormat)
            {
                case ReportFormat.Pdf:
                    fileExtension = Constants.DynamicScanDownloadPdfExt;
                    break;
                case ReportFormat.Excel:
                    fileExtension = Constants.DynamicScanDownloadXlsxExt;
                    break;
                default:
                    throw new NotSupportedException($"{reportFormat} is not supported");
            }

            return fileExtension;
        }
    }
}
