using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : BaseController
    {
        private readonly ILanguageService _languageService;

        public LanguageController(ILanguageService languageService)
        {
            _languageService = languageService;
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            Result<List<IdNamePair>> result = await _languageService.GetAllLanguagesAsync();

            return GetActionResult(result);
        }
    }
}