using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository
{
    public interface IQualityProfileRepository : IBaseRepository
    {
        /// <summary>
        /// Get all quality profiles
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public Task<ListResult<QualityProfileDTO>> GetAllQualityProfilesAsync(QualityProfileListRequest request);

        /// <summary>
        /// Get quality profile
        /// </summary>
        /// <param name="qualityProfileId"></param>
        /// <returns></returns>
        public Task<QualityProfileDTO> GetQualityProfileByIdAsync(int qualityProfileId);

        /// <summary>
        /// Get quality profiles for language
        /// </summary>
        /// <param name="languageId"></param>
        /// <returns></returns>
        public Task<List<QualityProfileDTO>> GetQualityProfilesByLanguageIdAsync(int languageId);

        /// <summary>
        /// Add quality profile
        /// </summary>
        /// <param name="qualityProfileDTO"></param>
        /// <returns></returns>
        public Task<int> AddQualityProfileAsync(QualityProfileDTO qualityProfileDTO);

        /// <summary>
        /// Get quality profile by name
        /// </summary>
        /// <param name="languageId"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public Task<QualityProfileDTO> GetQualityProfileByNameAsync(short languageId, string name);

        /// <summary>
        /// Update quality profile
        /// </summary>
        /// <param name="qualityProfileDTO"></param>
        /// <returns></returns>
        public Task<bool> UpdateQualityProfileAsync(QualityProfileDTO qualityProfileDTO);
    }
}
