using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository
{
    public class QualityProfilePreferencesRepository : CodeAnalyzerBaseRepository<QualityProfilePreferences>, IQualityProfilePreferencesRepository
    {
        public QualityProfilePreferencesRepository(CodeAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<QualityProfilePreferenceDTO> GetQualityProfilePreferenceAsync(EntityType entityType, int entityId, int languageId)
        {
            QualityProfilePreferences res = await _dbContext.Set<QualityProfilePreferences>().AsNoTracking()
                 .Include(s => s.QualityProfile)
                 .Include(s => s.QualityProfile).ThenInclude(s => s.Language)
                 .FirstOrDefaultAsync(s => s.EntityId == entityId
                    && s.EntityTypeId == (short)entityType
                    && s.QualityProfile.LanguageId == languageId
                    && s.IsDeleted == false);

            return res.ToQualityProfilePreferenceDTO();
        }

        public async Task<QualityProfilePreferenceDTO> GetQualityProfilePreferencByIdAsync(int id)
        {
            QualityProfilePreferences res = await _dbContext.Set<QualityProfilePreferences>().AsNoTracking()
                 .Include(s => s.QualityProfile)
                 .Include(s => s.QualityProfile).ThenInclude(s => s.Language)
                 .FirstOrDefaultAsync(s => s.Id == id
                    && s.IsDeleted == false);

            return res.ToQualityProfilePreferenceDTO();
        }

        public async Task<List<QualityProfilePreferenceDTO>> GetQualityProfilePreferenceByEntityAsync(EntityType entityType, int entityId)
        {
            List<QualityProfilePreferences> qualityProfilePreferences = await _dbContext.QualityProfilePreferences
                .Include(s => s.QualityProfile)
                .Include(s => s.QualityProfile).ThenInclude(s => s.Language)
                .Where(s => s.IsDeleted == false 
                    && s.EntityTypeId == (short)entityType 
                    && s.EntityId == entityId)
                .ToListAsync();

            return qualityProfilePreferences.ToQualityProfilePreferenceDTOList();
        }

        public async Task<int> AddQualityProfilePreferenceAsync(QualityProfilePreferencesRequestDTO qualityProfilePreferenceDTO)
        {
            QualityProfilePreferences qualityProfilePreferences = qualityProfilePreferenceDTO.ToQualityProfilePreference();
            await AddAsync(qualityProfilePreferences);

            return qualityProfilePreferences.Id;
        }

        public async Task<int> UpdateQualityProfilePreferenceAsync(QualityProfilePreferencesRequestDTO qualityProfilePreferenceDTO)
        {
            QualityProfilePreferences qualityProfilePreferences = qualityProfilePreferenceDTO.ToQualityProfilePreference();
            await UpdateAsync(qualityProfilePreferences);

            return qualityProfilePreferences.Id;
        }

        public async Task<bool> DeleteByIdAsync(int id)
        {
            QualityProfilePreferences qualityProfilePreferences = await GetAsync(s => s.Id == id && s.IsDeleted == false);

            if (qualityProfilePreferences != null)
            {
                qualityProfilePreferences.IsDeleted = true;
                await UpdateAsync(qualityProfilePreferences);
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteQualityProfilePreferencesAsync(EntityType entityType, int entityId)
        {
            List<QualityProfilePreferences> qualityProfilePreferences = await _dbContext.QualityProfilePreferences
                .Where(s => s.IsDeleted == false 
                    && s.EntityTypeId == (short)entityType 
                    && s.EntityId == entityId)
                .ToListAsync();

            foreach (QualityProfilePreferences preference in qualityProfilePreferences)
            {
                preference.IsDeleted = true;
            }

            _dbContext.QualityProfilePreferences.UpdateRange(qualityProfilePreferences);
            
            return await SaveChangesAsync();
        }
    }
}
