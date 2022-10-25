using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models.Excel;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Builders
{
    public class IssueSheetBuilder
    {
        public ExcelSheetData Build(DynamicScanReportModel dynamicScanReportModel)
        {
            List<ColumnConfiguration> columnConfigurations = BuildReportColumns();
            List<Dictionary<string, string>> data = BuildReportData(dynamicScanReportModel.Issues, dynamicScanReportModel.ProjectName);

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
                BuildReportColumn("Project"),
                BuildReportColumn(nameof(DynamicScanResultDTO.Url)),
                BuildReportColumn(nameof(DynamicScanResultDTO.AlertMessage), "Vulnerability"),
                BuildReportColumn(nameof(DynamicScanResultDTO.Description)),
                BuildReportColumn(nameof(DynamicScanResultDTO.RiskLevel), "Risk"),
                BuildReportColumn(nameof(DynamicScanResultDTO.Solution)),
                BuildReportColumn(nameof(DynamicScanResultDTO.Reference)),
            };

            return columnConfigurations;
        }

        private ColumnConfiguration BuildReportColumn(string property, string displayName = null)
        {
            return new ColumnConfiguration
            {
                DisplayName = displayName ?? property,
                Property = property
            };
        }

        private List<Dictionary<string, string>> BuildReportData(List<DynamicScanResultDTO> issues, string projectName)
        {
            var data = new List<Dictionary<string, string>>();
            foreach (var issue in issues)
            {
                data.Add(BuildReportData(issue, projectName));
            }

            return data;
        }

        private Dictionary<string, string> BuildReportData(DynamicScanResultDTO issue, string projectName)
        {
            return new Dictionary<string, string>()
            {
                { "Project", projectName },
                { nameof(DynamicScanResultDTO.Url), issue.Url },
                { nameof(DynamicScanResultDTO.AlertMessage), issue.AlertMessage },
                { nameof(DynamicScanResultDTO.Description), issue.Description },
                { nameof(DynamicScanResultDTO.RiskLevel), issue.RiskLevel },
                { nameof(DynamicScanResultDTO.Solution), issue.Solution },
                { nameof(DynamicScanResultDTO.Reference), issue.Reference },
            };
        }
    }
}
