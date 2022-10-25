
using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Enums;

namespace Com.ACSCorp.Accelerator.QueueAPI.Models
{
    public class QueueConfiguration
    {
        public FetchType Fetchtype { get; set; }
        public QueueProcessingType QueueProcessingType { get; set; }
        public int BatchSize { get; set; }
    }
}
