using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;

using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Mapper
{
    public static class QualityProfileMapper
    {
        public static QualityProfileDTO ToQualityProfileDTO(this QualityProfile qualityProfile)
        {
            if (qualityProfile == null)
            {
                return null;
            }

            QualityProfileDTO qualityProfileDTO = new QualityProfileDTO
            {
                Id = qualityProfile.Id,
                Name = qualityProfile.Name,
                LanguageId = qualityProfile.LanguageId,
                LanguageName = qualityProfile.Language?.Name,
                Key = qualityProfile.Key,
                ClientId = qualityProfile.ClientId
            };

            CommonMapper.MapBaseDTODetails(qualityProfile, qualityProfileDTO);

            return qualityProfileDTO;
        }

        public static List<QualityProfileDTO> ToQualityProfileDTOList(this List<QualityProfile> qualityProfiles)
        {
            if (qualityProfiles == null)
            {
                return null;
            }

            List<QualityProfileDTO> qualityProfileDTOs = new List<QualityProfileDTO>();

            foreach (QualityProfile client in qualityProfiles)
            {
                qualityProfileDTOs.Add(client.ToQualityProfileDTO());
            }

            return qualityProfileDTOs;
        }

        public static QualityProfile ToQualityProfileEntity(this QualityProfileDTO qualityProfileDTO)
        {
            if (qualityProfileDTO == null)
            {
                return null;
            }

            QualityProfile qualityProfile = new QualityProfile
            {
                Id = qualityProfileDTO.Id,
                Name = qualityProfileDTO.Name,
                Key = qualityProfileDTO.Key,
                LanguageId = qualityProfileDTO.LanguageId,
                ClientId = qualityProfileDTO.ClientId
            };

            return qualityProfile;
        }

        public static QualityProfilePreferences ToQualityProfilePreference(this QualityProfilePreferencesRequestDTO qualityProfilePreferencesDTO)
        {
            QualityProfilePreferences qualityProfilePreference = null;

            if (qualityProfilePreferencesDTO != null)
            {
                qualityProfilePreference = new QualityProfilePreferences
                {
                    Id = qualityProfilePreferencesDTO.Id,
                    EntityId = qualityProfilePreferencesDTO.EntityId,
                    EntityTypeId = (short)qualityProfilePreferencesDTO.EntityType,
                    QualityProfileId = qualityProfilePreferencesDTO.QualityProfileId,
                    IsDeleted = false
                };
            }

            return qualityProfilePreference;
        }

        public static List<QualityProfilePreferenceDTO> ToQualityProfilePreferenceDTOList(this IEnumerable<QualityProfilePreferences> qualityProfilePreferences)
        {
            List<QualityProfilePreferenceDTO> qualityProfilePreferenceDTOs = new List<QualityProfilePreferenceDTO>();

            if (qualityProfilePreferences != null && qualityProfilePreferences.Any())
            {
                qualityProfilePreferenceDTOs.AddRange(qualityProfilePreferences.Select(s => s.ToQualityProfilePreferenceDTO()));
            }

            return qualityProfilePreferenceDTOs;
        }

        public static QualityProfilePreferences ToQualityProfilePreference(this QualityProfilePreferenceDTO qualityProfilePreferenceDTO)
        {
            QualityProfilePreferences qualityProfilePreference = null;
            if (qualityProfilePreferenceDTO != null)
            {
                qualityProfilePreference = new QualityProfilePreferences
                {
                    Id = qualityProfilePreferenceDTO.Id,
                    EntityId = qualityProfilePreferenceDTO.EntityId,
                    EntityTypeId = (short)qualityProfilePreferenceDTO.EntityType,
                    QualityProfileId = qualityProfilePreferenceDTO.QualityProfileId
                };
            }
            return qualityProfilePreference;
        }

        public static QualityProfilePreferenceDTO ToQualityProfilePreferenceDTO(this QualityProfilePreferences qualityProfilePreferences)
        {
            QualityProfilePreferenceDTO qualityProfilePreferenceDTO = null;
            if (qualityProfilePreferences != null)
            {
                qualityProfilePreferenceDTO = new QualityProfilePreferenceDTO
                {
                    Id = qualityProfilePreferences.Id,
                    EntityType = (EntityType)qualityProfilePreferences.EntityTypeId,
                    EntityId = qualityProfilePreferences.EntityId,
                    QualityProfileId = qualityProfilePreferences.QualityProfile.Id,
                    QualityProfileName = qualityProfilePreferences.QualityProfile.Name,
                    LanguageId = qualityProfilePreferences.QualityProfile.LanguageId,
                    LanguageName = qualityProfilePreferences.QualityProfile.Language.Name
                };
            }

            return qualityProfilePreferenceDTO;
        }
    }
}
