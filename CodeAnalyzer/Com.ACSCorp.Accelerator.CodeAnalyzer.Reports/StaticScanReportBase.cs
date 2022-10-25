using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;

using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Reports
{
    internal abstract class StaticScanReportBase
    {
        protected string GetStaticScanReportName(ReportFormat reportFormat)
        {
            string fileNameBase = Constants.StaticScanDownloadBaseFileName;
            string fileNameSuffix = DateTime.Now.ToString(Constants.StaticScanDownloadLongYearFormat);
            string fileExtensionIncludingPeriod = GetFileExtension(reportFormat);

            return $"{fileNameBase}{fileNameSuffix}{fileExtensionIncludingPeriod}";
        }

        private string GetFileExtension(ReportFormat reportFormat)
        {
            string fileExtension;

            switch (reportFormat)
            {
                case ReportFormat.Pdf:
                    fileExtension = Constants.StaticScanDownloadPdfExt;
                    break;
                case ReportFormat.Excel:
                    fileExtension = Constants.StaticScanDownloadXlsxExt;
                    break;
                default:
                    throw new NotSupportedException($"{reportFormat} is not supported");
            }

            return fileExtension;
        }
    }
}
