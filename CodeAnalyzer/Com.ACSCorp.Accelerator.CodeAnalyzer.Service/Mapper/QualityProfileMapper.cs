using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.Mapper
{
    public static class QualityProfileMapper
    {
        public static RuleActivationDTO ToRuleActivationDTO(this RuleActivationRequestModel ruleActivationRequest)
        {
            RuleActivationDTO ruleActivationDTO = null;
            if (ruleActivationRequest != null)
            {
                ruleActivationDTO = new RuleActivationDTO
                {
                    QualityProfileId = ruleActivationRequest.QualityProfileId,
                    RuleKey = ruleActivationRequest.RuleKey,
                    IsActive = ruleActivationRequest.IsActive
                };
            }
            return ruleActivationDTO;
        }

        public static QualityProfileDTO ToQualityProfileDTO(this QualityProfileRequestModel qualityProfileRequest)
        {
            QualityProfileDTO qualityProfileDTO = null;

            if (qualityProfileRequest != null)
            {
                qualityProfileDTO = new QualityProfileDTO
                {
                    Id = qualityProfileRequest.Id,
                    Name = qualityProfileRequest.Name,
                    LanguageId = qualityProfileRequest.LanguageId,
                    ClientId = qualityProfileRequest.ClientId
                };
            }
            return qualityProfileDTO;
        }

        public static ListResult<QualityProfileResponseModel> ToQualityProfileResponseListResult(this ListResult<QualityProfileDTO> qualityProfileDTOs)
        {
            ListResult<QualityProfileResponseModel> qualityProfileResponses = new ListResult<QualityProfileResponseModel>
            {
                Total = qualityProfileDTOs.Total,
                Items = new List<QualityProfileResponseModel>()
            };

            if (qualityProfileDTOs != null && qualityProfileDTOs.Total > 0)
            {
                foreach (QualityProfileDTO qualityProfileDTO in qualityProfileDTOs.Items)
                {
                    qualityProfileResponses.Items.Add(qualityProfileDTO.ToQualityProfileResponse());
                }
            }
            return qualityProfileResponses;
        }

        public static QualityProfileResponseModel ToQualityProfileResponse(this QualityProfileDTO qualityProfileDTO)
        {
            QualityProfileResponseModel qualityProfileResponse = null;

            if (qualityProfileDTO != null)
            {
                qualityProfileResponse = new QualityProfileResponseModel
                {
                    LanguageId = qualityProfileDTO.LanguageId,
                    LanguageName = qualityProfileDTO.LanguageName,
                    Name = qualityProfileDTO.Name,
                    Id = qualityProfileDTO.Id,
                    IsDeleted = qualityProfileDTO.IsDeleted
                };
                CommonMapper.MapBaseEntityDetails(qualityProfileDTO, qualityProfileResponse);
            }
            return qualityProfileResponse;
        }
    }
}
