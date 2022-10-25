using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.Mapper
{
    public static class QualityProfilePreferenceMapper
    {
        public static List<QualityProfilePreferenceModel> ToQualityProfilePreferenceModelList(this IEnumerable<QualityProfilePreferenceDTO> qualityProfilePreferenceDTOs)
        {
            List<QualityProfilePreferenceModel> QualityProfilePreferences = new List<QualityProfilePreferenceModel>();
            if (qualityProfilePreferenceDTOs != null && qualityProfilePreferenceDTOs.Any())
            {
                QualityProfilePreferences.AddRange(qualityProfilePreferenceDTOs.Select(s => new QualityProfilePreferenceModel
                {
                    Id = s.Id,
                    QualityProfileName = s.QualityProfileName,
                    QualityProfileId = s.QualityProfileId,
                    LanguageId = s.LanguageId,
                    LanguageName = s.LanguageName
                }));
            }
            return QualityProfilePreferences;
        }
    }
}
