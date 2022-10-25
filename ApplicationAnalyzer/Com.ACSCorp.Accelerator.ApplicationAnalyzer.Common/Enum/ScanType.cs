using System.ComponentModel;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum
{
    public enum ScanType
    {
        [Description("Static Scan")]
        StaticScan = 1,
        [Description("Dynamic Scan")]
        DynamicScan
    }
}
