using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface ILanguageService
    {
        /// <summary>
        /// Get all languages
        /// </summary>
        /// <returns></returns>
        public Task<Result<List<IdNamePair>>> GetAllLanguagesAsync();

        /// <summary>
        /// Get language by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<Result<LanguageDTO>> GetLanguageByIdAsync(int id);
    }
}
