using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Models.Excel;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Builders
{
    public class IssueSheetBuilder
    {
        public ExcelSheetData Build(StaticScanReportModel staticScanReportModel)
        {
            List<ColumnConfiguration> columnConfigurations = BuildReportColumns();
            List<Dictionary<string, string>> data = BuildReportData(staticScanReportModel);

            return new ExcelSheetData
            {
                Name = "Issues",
                Headers = columnConfigurations,
                Data = data
            };
        }

        private List<ColumnConfiguration> BuildReportColumns()
        {
            var columnConfigurations = new List<ColumnConfiguration>
            {
                BuildReportColumn(nameof(SonarIssueDTO.Project)),
                BuildReportColumn(nameof(SonarIssueDTO.Rule)),
                BuildReportColumn(nameof(SonarIssueDTO.Message)),
                BuildReportColumn(nameof(SonarIssueDTO.Severity)),
                BuildReportColumn(nameof(SonarIssueDTO.Type)),
                BuildReportColumn(nameof(SonarIssueDTO.Component)),
                BuildReportColumn(nameof(SonarIssueDTO.Line)),
            };

            return columnConfigurations;
        }

        private ColumnConfiguration BuildReportColumn(string property, string displayName = null)
        {
            return new ColumnConfiguration
            {
                DisplayName = displayName ?? property,
                Property = property,
            };
        }

        private List<Dictionary<string, string>> BuildReportData(StaticScanReportModel staticScanReportModel)
        {
            var data = new List<Dictionary<string, string>>();

            foreach (var staticScanIssue in staticScanReportModel.Issues)
            {
                data.Add(BuildReportData(staticScanIssue, staticScanReportModel.ProjectName));
            }

            return data;
        }

        private Dictionary<string, string> BuildReportData(SonarIssueDTO staticScanIssue, string projectName)
        {
            return new Dictionary<string, string>()
            {
                { nameof(SonarIssueDTO.Project), projectName },
                { nameof(SonarIssueDTO.Rule), staticScanIssue.Rule },
                { nameof(SonarIssueDTO.Message), staticScanIssue.Message },
                { nameof(SonarIssueDTO.Severity), staticScanIssue.Severity },
                { nameof(SonarIssueDTO.Type), staticScanIssue.Type },
                { nameof(SonarIssueDTO.Component), staticScanIssue.Component },
                { nameof(SonarIssueDTO.Line), staticScanIssue.Line.ToString() },
            };
        }
    }
}
