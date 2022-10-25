using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Builders;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Interfaces;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Models.Excel;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Services;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Reports
{
    internal class StaticScanExcelReport : StaticScanReportBase, IStaticScanReport
    {
        public Report Generate(StaticScanReportModel staticScanReportModel)
        {
            var excelService = new ExcelService();

            var issueSheetBuilder = new IssueSheetBuilder();
            ExcelSheetData issuesSheetData = issueSheetBuilder.Build(staticScanReportModel);

            var codeCoverageSheetBuilder = new CodeCoverageSheetBuilder();
            ExcelSheetData codeCoverageSheetData = codeCoverageSheetBuilder.Build(staticScanReportModel.CodeCoverage);

            return new Report
            {
                FileName = GetStaticScanReportName(ReportFormat.Excel),
                Bytes = excelService.BuildSheet(issuesSheetData, codeCoverageSheetData),
                MimeType = Constants.MimeTypes.ExcelMimeType
            };
        }
    }
}
