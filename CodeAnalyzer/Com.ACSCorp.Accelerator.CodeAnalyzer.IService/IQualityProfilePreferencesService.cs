using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IQualityProfilePreferencesService
    {
        /// <summary>
        /// Get quality profile preferences
        /// </summary>
        /// <param name="entityType"></param>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public Task<Result<QualityProfilePreferencesResponseModel>> GetQualityProfilePreferenceByEntityAsync(EntityType entityType, int entityId);

        /// <summary>
        /// Add Quality profile preference
        /// </summary>
        /// <param name="qualityProfilePreferencesRequest"></param>
        /// <returns></returns>
        public Task<Result<int>> AddQualityProfilePreferenceAsync(QualityProfilePreferencesRequestDTO qualityProfilePreferencesRequest);

        /// <summary>
        /// Update Quality profile preference
        /// </summary>
        /// <param name="updateQualityProfilePreferenceRequest"></param>
        /// <returns></returns>
        public Task<Result<int>> UpdateQualityProfilePrefereceAsync(UpdateQualityProfilePreferenceModel updateQualityProfilePreferenceRequest);

        /// <summary>
        /// Delete Quality profile preference
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public Task<Result<bool>> DeleteAsync(int Id);
        public Task<Result<bool>> DeleteQualityProfilePreferencesAsync(EntityType entityType, int entityId);
    }
}
