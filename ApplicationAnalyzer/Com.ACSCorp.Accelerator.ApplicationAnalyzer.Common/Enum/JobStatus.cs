using System.ComponentModel;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum
{
    public enum JobStatus
    {
        [Description("Started")]
        Started = 1,

        [Description("Completed")]
        Completed,

        [Description("Failed")]
        Failed,

        [Description("Aborted")]
        Aborted,
    }
}
