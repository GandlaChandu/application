namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class RuleActivationDTO
    {
        public int QualityProfileId { get; set; }
        public string QualityProfileKey { get; set; }
        public string RuleKey { get; set; }
        public bool IsActive { get; set; }
    }
}
