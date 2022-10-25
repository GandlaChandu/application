using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfilePreferenceDTO
    {
        public int Id { get; set; }
        public EntityType EntityType { get; set; }
        public int EntityId { get; set; }
        public int QualityProfileId { get; set; }
        public string QualityProfileName { get; set; }
        public int LanguageId { get; set; }
        public string LanguageName { get; set; }
    }
}
