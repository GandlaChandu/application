namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Common
{
    public static class Constants
    {
        public const string DynamicScanDownloadLongYearFormat = "yyyyMMddHHmmss";
        public const string DynamicScanDownloadBaseFileName = "DynamicScan_Report_";
        public const string DynamicScanDownloadPdfExt = ".pdf";
        public const string DynamicScanDownloadXlsxExt = ".xlsx";

        public const string TicketSystemHttpClient = "TicketSystem";
        public const string TicketSystemEndPoint = "TicketSystemUrl";
        public const string LowConstant = "low";
        public const string MediumConstant = "medium";
        public const string HighConstant = "high";
        public const string InfoConstant = "informational";
        public const string UTF8 = "utf-8";
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
            public const string SecurityAnalyzerBaseUrl = "SecurityAnalyzerBaseUrl";
            public const string ApplicationAnalyzerAPIUrl = "ApplicationAnalyzerAPIUrl";
        }

        public struct DynamicScanValidatorConstants
        {
            public const int DynamicScanApplicationURLMaxLength = 200;
        }

        public struct DynamicScanEmailConstants
        {
            public const int EmailAttachmentFontSize = 20;
            public const string DynamicScanEmailTemplate = "DynamicScanReportEmailBodyTemplate.cshtml";
            public const string DynamicScanEmailPDFTemplateName = "DynamicScanReportDownloadTemplate.cshtml";
            public const string DynamicScanEmailSubjectName = "Application Analyzer - {0} - Dynamic Scan - {1}";
            public const string DynamicScanEmailSubjectDateFormat = "dd-MMM-yyyy";
        }
    }
}
