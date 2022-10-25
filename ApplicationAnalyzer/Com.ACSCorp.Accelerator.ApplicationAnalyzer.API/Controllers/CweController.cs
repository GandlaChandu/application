using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CweController : BaseController
    {
        private readonly ICweInfoService _cweInfoService;

        public CweController(ICweInfoService cweInfoService)
        {
            _cweInfoService = cweInfoService;
        }

        [HttpPost("GetAll")]
        public async Task<IActionResult> GetAllAsync(List<int> cweIds)
        {
            var cweInfoResult = await _cweInfoService.GetCweInfoByIdsAsync(cweIds);

            return GetActionResult(cweInfoResult);
        }
    }
}