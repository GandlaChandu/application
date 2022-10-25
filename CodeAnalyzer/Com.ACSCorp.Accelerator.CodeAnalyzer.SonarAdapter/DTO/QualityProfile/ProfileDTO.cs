namespace Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO.QualityProfile
{
    public class ProfileDTO
    {
        public bool IsDefault { get; set; }
        public bool IsInherited { get; set; }
        public string Language { get; set; }
        public string LanguageName { get; set; }
        public string Name { get; set; }
        public string Key { get; set; }
    }
}
