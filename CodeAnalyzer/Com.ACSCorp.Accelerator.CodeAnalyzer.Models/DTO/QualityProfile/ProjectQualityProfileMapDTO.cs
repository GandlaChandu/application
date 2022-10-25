namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class ProjectQualityProfileMapDTO
    {
        public int LanguageId { get; set; }
        public string QualityProfileName { get; set; }
        public int EntityId { get; set; }
        public bool IsActive { get; set; }
    }
}
