using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class ZapScanPolicy
    {
        public string Name { get; set; }
        public StrengthType AttackStrength { get; set; }
        public ThresholdType AlertThreshold { get; set; }
    }
}
