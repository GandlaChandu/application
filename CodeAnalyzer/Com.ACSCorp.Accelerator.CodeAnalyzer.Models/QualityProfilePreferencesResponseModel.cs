using Com.ACSCorp.Accelerator.Core.Models.Enums;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfilePreferencesResponseModel
    {
        public EntityType EntityType { get; set; }
        public int EntityId { get; set; }
        public List<QualityProfilePreferenceModel> QualityProfilePreferences { get; set; }
    }
}
