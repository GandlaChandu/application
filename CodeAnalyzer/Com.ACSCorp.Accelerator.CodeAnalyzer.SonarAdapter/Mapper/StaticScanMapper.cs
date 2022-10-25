using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO;
using Com.ACSCorp.Accelerator.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Mapper
{
    internal static class StaticScanMapper
    {
        public static ListResult<SonarIssueDTO> ToPagedStaticScanIssues(this SonarStaticScanResultDTO staticScanResult)
        {
            return new ListResult<SonarIssueDTO>
            {
                Items = staticScanResult.ToStaticScanIssues(),
                Total = staticScanResult.Total
            };
        }

        public static List<SonarIssueDTO> ToStaticScanIssues(this SonarStaticScanResultDTO staticScanResult)
        {
            if (staticScanResult?.Rules?.Count > 0)
            {
                foreach (SonarIssueDTO issue in staticScanResult.Issues)
                {
                    issue.Rule = staticScanResult.Rules.FirstOrDefault(s => s.Key == issue.Rule)?.Name ?? issue.Rule;
                }
            }

            return staticScanResult.Issues;
        }

        public static StaticScanOverviewDTO ToStaticScanOverviewDTO(this MeasureResponse measureResponse)
        {
            StaticScanOverviewDTO staticScanOverviewDTO = new StaticScanOverviewDTO();

            foreach (Measure measure in measureResponse.Component.Measures)
            {
                switch (measure.Metric)
                {
                    case SonarMetricConstants.Coverage:
                        staticScanOverviewDTO.Coverage = Convert.ToDecimal(measure.Value);
                        break;
                    case SonarMetricConstants.Complexity:
                        staticScanOverviewDTO.CyclomaticComplexicity = Convert.ToInt32(measure.Value);
                        break;
                    case SonarMetricConstants.DuplicatedLines:
                        staticScanOverviewDTO.DuplicatedLines = Convert.ToInt32(measure.Value);
                        break;
                    case SonarMetricConstants.DuplicatedLinesDensity:
                        staticScanOverviewDTO.DuplicatedLinesPercentage = Convert.ToDecimal(measure.Value);
                        break;
                    case SonarMetricConstants.Tests:
                        staticScanOverviewDTO.Tests = Convert.ToInt32(measure.Value);
                        break;
                    case SonarMetricConstants.TestSuccessDensity:
                        staticScanOverviewDTO.TestSuccessPercentage = Convert.ToDecimal(measure.Value);
                        break;
                    default:
                        break;
                }
            }

            return staticScanOverviewDTO;
        }

        public static ListResult<SonarRuleDTO> ToPagedRuleDTO(this RulesResponse staticScanResult)
        {
            return new ListResult<SonarRuleDTO>
            {
                Items = staticScanResult.Rules,
                Total = staticScanResult.Total
            };
        }
    }
}
