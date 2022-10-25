using System.ComponentModel;

namespace Com.ACSCorp.Accelerator.DMA.Scheduler.Services.Enums
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
