using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IQualityProfileService
    {
        /// <summary>
        /// Get all quality profiles
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public Task<Result<ListResult<QualityProfileResponseModel>>> GetAllQualityProfilesAsync(QualityProfileListRequest request);

        /// <summary>
        /// Get quality profiles by language
        /// </summary>
        /// <param name="languageId"></param>
        /// <returns></returns>
        public Task<Result<List<IdNamePair>>> GetQualityProfilesByLanguageIdAsync(int languageId);

        /// <summary>
        /// Get quality profile
        /// </summary>
        /// <param name="qualityProfileId"></param>
        /// <returns></returns>
        public Task<Result<QualityProfileResponseModel>> GetQualityProfileByIdAsync(int qualityProfileId);

        /// <summary>
        /// Get quality profile rules
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public Task<Result<ListResult<SonarRuleDTO>>> GetQualityProfileRulesAsync(QualityProfileRuleListRequest request);

        /// <summary>
        /// Add quality profile
        /// </summary>
        /// <param name="qualityProfileModel"></param>
        /// <returns></returns>
        public Task<Result<int>> AddQualityProfileAsync(QualityProfileRequestModel qualityProfileModel);

        /// <summary>
        /// Update quality profile
        /// </summary>
        /// <param name="qualityProfileDTO"></param>
        /// <returns></returns>
        public Task<Result<bool>> UpdateQualityProfileAsync(QualityProfileRequestModel qualityProfileDTO);

        /// <summary>
        /// Update rule activation
        /// </summary>
        /// <param name="ruleActivationModel"></param>
        /// <returns></returns>
        public Task<Result<bool>> ChangeRuleActivationAsync(RuleActivationRequestModel ruleActivationModel);

    }
}
