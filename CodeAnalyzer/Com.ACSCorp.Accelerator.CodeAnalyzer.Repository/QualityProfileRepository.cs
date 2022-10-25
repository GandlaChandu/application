using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository
{
    public class QualityProfileRepository : CodeAnalyzerBaseRepository<QualityProfile>, IQualityProfileRepository
    {
        public QualityProfileRepository(CodeAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<int> AddQualityProfileAsync(QualityProfileDTO qualityProfileDTO)
        {
            QualityProfile qualityProfile = qualityProfileDTO.ToQualityProfileEntity();
            await AddAsync(qualityProfile);
            return qualityProfile.Id;
        }

        public async Task<QualityProfileDTO> GetQualityProfileByNameAsync(short languageId, string name)
        {
            QualityProfile qualityProfile = await GetAsync(c => c.LanguageId == languageId && c.Name.Equals(name));
            return qualityProfile.ToQualityProfileDTO();
        }

        public async Task<ListResult<QualityProfileDTO>> GetAllQualityProfilesAsync(QualityProfileListRequest request)
        {
            var query = GetAll()
                .Where(c => !c.ClientId.HasValue)
                .Include(s => s.Language)
                .OrderByDescending(c => c.Id);

            ListResult<QualityProfile> pagedResult = await QueryUtility<QualityProfile>.GetQueryResultAsync(query, request.ListParameter);

            return new ListResult<QualityProfileDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToQualityProfileDTOList()
            };
        }

        public async Task<QualityProfileDTO> GetQualityProfileByIdAsync(int qualityProfileId)
        {
            QualityProfile qualityProfile = await GetAsync(c => c.Id == qualityProfileId);
            return qualityProfile.ToQualityProfileDTO();
        }

        public async Task<List<QualityProfileDTO>> GetQualityProfilesByLanguageIdAsync(int languageId)
        {
            List<QualityProfile> qualityProfiles = await GetAll(s => s.LanguageId == languageId && s.IsDeleted == false).ToListAsync();
            return qualityProfiles.ToQualityProfileDTOList();
        }

        public async Task<bool> UpdateQualityProfileAsync(QualityProfileDTO qualityProfileDTO)
        {
            QualityProfile qualityProfile = qualityProfileDTO.ToQualityProfileEntity();
            await UpdateAsync(qualityProfile);
            return true;
        }
    }
}
