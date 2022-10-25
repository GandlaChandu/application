using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
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
    public class QualityProfileController : BaseController
    {
        private readonly IQualityProfileService _qualityProfileService;

        public QualityProfileController(IQualityProfileService qualityProfileService)
        {
            _qualityProfileService = qualityProfileService;
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPost("GetAll")]
        public async Task<IActionResult> GetAll(QualityProfileListRequest request)
        {
            Result<ListResult<QualityProfileResponseModel>> result = await _qualityProfileService.GetAllQualityProfilesAsync(request);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Result<QualityProfileResponseModel> result = await _qualityProfileService.GetQualityProfileByIdAsync(id);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPost("Post")]
        public async Task<IActionResult> Post(QualityProfileRequestModel qualityProfileModel)
        {
            Result<int> result = await _qualityProfileService.AddQualityProfileAsync(qualityProfileModel);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPut("Put")]
        public async Task<IActionResult> Put(QualityProfileRequestModel qualityProfileDTO)
        {
            Result<bool> result = await _qualityProfileService.UpdateQualityProfileAsync(qualityProfileDTO);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpGet("GetQualityProfilesByLanguageId/{languageId}")]
        public async Task<IActionResult> GetQualityProfiles(int languageId)
        {
            Result<List<IdNamePair>> result = await _qualityProfileService.GetQualityProfilesByLanguageIdAsync(languageId);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPost("GetQualityProfileRules")]
        public async Task<IActionResult> GetQualityProfileRules(QualityProfileRuleListRequest request)
        {
            Result<ListResult<SonarRuleDTO>> result = await _qualityProfileService.GetQualityProfileRulesAsync(request);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPost("ChangeRuleActivation")]
        public async Task<IActionResult> ChangeRuleActivation(RuleActivationRequestModel ruleActivationRequest)
        {
            Result<bool> result = await _qualityProfileService.ChangeRuleActivationAsync(ruleActivationRequest);

            return GetActionResult(result);
        }
    }
}