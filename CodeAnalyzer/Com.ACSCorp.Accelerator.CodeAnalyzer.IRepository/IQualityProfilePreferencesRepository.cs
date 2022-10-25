using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository
{
    public interface IQualityProfilePreferencesRepository : IBaseRepository
    {
        /// <summary>
        /// Get Quality profile preferences
        /// </summary>
        /// <param name="entityType"></param>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public Task<List<QualityProfilePreferenceDTO>> GetQualityProfilePreferenceByEntityAsync(EntityType entityType, int entityId);

        /// <summary>
        /// Get default Quality profile preference
        /// </summary>
        /// <param name="entityType"></param>
        /// <param name="entityId"></param>
        /// <param name="languageId"></param>
        /// <returns></returns>
        public Task<QualityProfilePreferenceDTO> GetQualityProfilePreferenceAsync(EntityType entityType, int entityId, int languageId);

        /// <summary>
        /// Get Quality profile preference by Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<QualityProfilePreferenceDTO> GetQualityProfilePreferencByIdAsync(int id);

        /// <summary>
        /// Delete quality profile preference by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<bool> DeleteByIdAsync(int id);

        /// <summary>
        /// Add quality profile preference
        /// </summary>
        /// <param name="qualityProfilePreferenceDTO"></param>
        /// <returns></returns>
        public Task<int> AddQualityProfilePreferenceAsync(QualityProfilePreferencesRequestDTO qualityProfilePreferenceDTO);

        /// <summary>
        /// Update Quality profile preference
        /// </summary>
        /// <param name="qualityProfilePreferenceDTO"></param>
        /// <returns></returns>
        public Task<int> UpdateQualityProfilePreferenceAsync(QualityProfilePreferencesRequestDTO qualityProfilePreferenceDTO);
        public Task<bool> DeleteQualityProfilePreferencesAsync(EntityType entityType, int entityId);
    }
}
