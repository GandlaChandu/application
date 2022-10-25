using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository
{
    public interface ILanguageRepository : IBaseRepository
    {
        /// <summary>
        /// Get all languages
        /// </summary>
        /// <returns></returns>
        public Task<List<IdNamePair>> GetAllLanguagesAsync();

        /// <summary>
        /// Get language by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<LanguageDTO> GetLanguageByIdAsync(int id);
    }
}
