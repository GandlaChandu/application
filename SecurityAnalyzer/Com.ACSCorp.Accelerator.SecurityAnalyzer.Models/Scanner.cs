using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class Scanner
    {
        public int Id { get; set; }
        public int PolicyId { get; set; }
        public string Name { get; set; }
        public int CWEId { get; set; }
        public int WASCId { get; set; }
        public StrengthType AttackStrength { get; set; }
        public ThresholdType AlertThreshold { get; set; }
        public bool Enabled { get; set; }
        public string Quality { get; set; }
    }
}
