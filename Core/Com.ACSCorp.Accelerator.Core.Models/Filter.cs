using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.Core.Models
{
    public class Filter
    {
        public string Name { get; set; }
        public Operator Operator { get; set; }
        public string FromValue { get; set; }
        public string ToValue { get; set; }
    }
}
