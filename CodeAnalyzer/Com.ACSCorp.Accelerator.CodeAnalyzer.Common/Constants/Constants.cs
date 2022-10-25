namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants
{
    public class Constants
    {
        public const string CMDExePath = "cmd.exe";
        public const string SonarServerHttpClient = "SonarQubeServer";
        public const string TicketSystemHttpClient = "TicketSystem";
        public const string SonarServerEndPoint = "SonarQubeServer:Url";
        public const string TicketSystemEndPoint = "TicketSystemUrl";
        public const string SonarServerInfo = "SonarQubeServer";
        public const string SonarSuccess = "SUCCESS";
        public const string StaticScanDownloadLongYearFormat = "yyyyMMddHHmmss";
        public const string StaticScanDownloadBaseFileName = "StaticScan_Report_";
        public const string StaticScanDownloadPdfExt = ".pdf";
        public const string StaticScanDownloadXlsxExt = ".xlsx";

        public const string AssestsFolder = "assets";
        public const string StyleFile = "styles.css";
        public const int MinimumFontSize = 14;

        public struct MimeTypes
        {
            public const string ExcelMimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            public const string PdfMimeType = "application/pdf";
        }

        public struct AppSettingConstants
        {
            public const string BaseRepositoryPath = "BaseRepositoryPath";
            public const string QueueAPIUrl = "QueueAPIUrl";
            public const string CodeAnalyzerBaseUrl = "CodeAnalyzerBaseUrl";
        }

        public struct StaticScanEmailConstants
        {
            public const int EmailAttachmentFontSize = 20;
            public const string StaticScanEmailBodyTemplate = "StaticScanReportEmailBodyTemplate.cshtml";
            public const string StaticScanEmailAttachmentPDFTemplateName = "StaticScanReportDownloadTemplate.cshtml";
            public const string StaticScanEmailSubjectName = "Application Analyzer - {0} - Static Scan - {1}";
            public const string StaticScanEmailSubjectDateFormat = "dd-MMM-yyyy";
        }
    }
}
