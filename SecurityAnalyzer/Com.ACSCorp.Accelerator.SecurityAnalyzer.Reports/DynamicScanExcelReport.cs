using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Builders;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Interfaces;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models.Excel;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Services;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports
{
    internal class DynamicScanExcelReport : DynamicScanReportBase, IDynamicScanReport
    {
        public Report Export(DynamicScanReportModel dynamicScanReportModel)
        {
            var excelService = new ExcelService();

            var issueSheetBuilder = new IssueSheetBuilder();
            ExcelSheetData issuesSheetData = issueSheetBuilder.Build(dynamicScanReportModel);

            return new Report
            {
                FileName = GetDynamicScanReportName(ReportFormat.Excel),
                Bytes = excelService.BuildSheet(issuesSheetData),
                MimeType = Constants.MimeTypes.ExcelMimeType
            };
        }
    }
}
