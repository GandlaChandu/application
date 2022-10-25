using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository
{
    public class LanguageRepository : CodeAnalyzerBaseRepository<Language>, ILanguageRepository
    {
        public LanguageRepository(CodeAnalyzerContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<IdNamePair>> GetAllLanguagesAsync()
        {
            IQueryable<Language> query = GetAll().Where(c => !c.IsDeleted);

            List<IdNamePair> activeLanguages = await query.Select(c => new IdNamePair
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync();

            return activeLanguages;
        }

        public async Task<LanguageDTO> GetLanguageByIdAsync(int id)
        {
            Language language = await GetAsync(c => c.Id == id);
            return new LanguageDTO
            {
                Id = language.Id,
                Name = language.Name,
                Code = language.Code
            };
        }
    }
}
