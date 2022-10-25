using Com.ACSCorp.Accelerator.Core.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO
{
    public class BasePolicyDTO : BaseDTO
    {
        public ThresholdType AlertThreshold { get; set; }
        public StrengthType AttackStrength { get; set; }
        public string AlertThresholdValue { get; set; }
        public string AttackStrengthValue { get; set; }
    }
}
