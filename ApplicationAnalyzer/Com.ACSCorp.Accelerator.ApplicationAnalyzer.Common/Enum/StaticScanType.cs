using System.ComponentModel;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum
{
    public enum StaticScanType
    {
        [Description("Coding Standards")]
        CodingStandards = 1,
        [Description("Security Checks")]
        SecurityChecks,
        [Description("Code Coverage")]
        CodeCoverage
    }
}
