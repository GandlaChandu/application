using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Models.Excel;

using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Builders
{
    public class CodeCoverageSheetBuilder
    {
        public ExcelSheetData Build(StaticScanOverviewDTO staticScanOverviewDTO)
        {
            List<ColumnConfiguration> columnConfigurations = BuildReportColumns();
            List<Dictionary<string, string>> data = BuildReportData(staticScanOverviewDTO);

            return new ExcelSheetData
            {
                Name = "Code Coverage",
                Headers = columnConfigurations,
                Data = data
            };
        }

        private List<ColumnConfiguration> BuildReportColumns()
        {
            var columnConfigurations = new List<ColumnConfiguration>
            {
                BuildReportColumn(nameof(StaticScanOverviewDTO.Coverage)),
                BuildReportColumn(nameof(StaticScanOverviewDTO.CyclomaticComplexicity), "CyclomaticComplexity"),
                BuildReportColumn(nameof(StaticScanOverviewDTO.DuplicatedLines)),
                BuildReportColumn(nameof(StaticScanOverviewDTO.DuplicatedLinesPercentage)),
                BuildReportColumn(nameof(StaticScanOverviewDTO.Tests)),
                BuildReportColumn(nameof(StaticScanOverviewDTO.TestSuccessPercentage)),
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

        private List<Dictionary<string, string>> BuildReportData(StaticScanOverviewDTO staticScanOverviewDTO)
        {
            var data = new List<Dictionary<string, string>>
            {
                new Dictionary<string, string>()
                {
                    { nameof(StaticScanOverviewDTO.Coverage), Convert.ToString(staticScanOverviewDTO.Coverage) },
                    { nameof(StaticScanOverviewDTO.CyclomaticComplexicity), Convert.ToString(staticScanOverviewDTO.CyclomaticComplexicity) },
                    { nameof(StaticScanOverviewDTO.DuplicatedLines), Convert.ToString(staticScanOverviewDTO.DuplicatedLines) },
                    { nameof(StaticScanOverviewDTO.DuplicatedLinesPercentage), Convert.ToString(staticScanOverviewDTO.DuplicatedLinesPercentage) },
                    { nameof(StaticScanOverviewDTO.Tests), Convert.ToString(staticScanOverviewDTO.Tests) },
                    { nameof(StaticScanOverviewDTO.TestSuccessPercentage), Convert.ToString(staticScanOverviewDTO.TestSuccessPercentage) }
                }
            };

            return data;
        }
    }
}
