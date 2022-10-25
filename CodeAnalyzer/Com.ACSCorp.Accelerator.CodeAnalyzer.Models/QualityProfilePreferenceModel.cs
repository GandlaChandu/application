namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfilePreferenceModel
    {
        public int Id { get; set; }
        public int QualityProfileId { get; set; }
        public string QualityProfileName { get; set; }
        public int LanguageId { get; set; }
        public string LanguageName { get; set; }
    }
}