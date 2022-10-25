using Com.ACSCorp.Accelerator.Core.Models.Enums;

using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfilePreferencesRequestDTO
    {
        public int Id { get; set; }
        [EnumDataType(typeof(EntityType), ErrorMessage = "EntityType is invalid.")]
        public EntityType EntityType { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "EntityId is required and should be greater than 0.")]
        public int EntityId { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "QualityProfileId is required and should be greater than 0.")]
        public int QualityProfileId { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "LanguageId is required and should be greater than 0.")]
        public int LanguageId { get; set; }
    }
}
