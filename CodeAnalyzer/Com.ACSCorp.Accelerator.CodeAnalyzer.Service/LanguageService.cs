using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class LanguageService : ILanguageService
    {
        #region Properties

        private readonly ILanguageRepository _languageRepository;

        #endregion Properties

        #region Constructor

        public LanguageService(ILanguageRepository languageRepository)
        {
            _languageRepository = languageRepository;
        }

        #endregion Constructor

        #region Public methods

        public async Task<Result<List<IdNamePair>>> GetAllLanguagesAsync()
        {
            List<IdNamePair> languages = await _languageRepository.GetAllLanguagesAsync();
            return Result.Ok(languages);
        }

        public async Task<Result<LanguageDTO>> GetLanguageByIdAsync(int id)
        {
            LanguageDTO language = await _languageRepository.GetLanguageByIdAsync(id);
            return Result.Ok(language);
        }

        #endregion Public methods
    }
}
