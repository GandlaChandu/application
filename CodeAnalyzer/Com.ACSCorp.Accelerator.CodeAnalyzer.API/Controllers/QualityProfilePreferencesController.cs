using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QualityProfilePreferencesController : BaseController
    {
        private readonly IQualityProfilePreferencesService _qualityProfilePreferencesService;
        
        public QualityProfilePreferencesController(IQualityProfilePreferencesService qualityProfilePreferencesService)
        {
            _qualityProfilePreferencesService = qualityProfilePreferencesService;
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpGet("Get/{entityType}/{entityId}")]
        public async Task<IActionResult> GetQualityProfilePreferenceByEntityAsync(EntityType entityType, int entityId)
        {
            Result<QualityProfilePreferencesResponseModel> result = await _qualityProfilePreferencesService.GetQualityProfilePreferenceByEntityAsync(entityType, entityId);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] QualityProfilePreferencesRequestDTO qualityProfilePreferenceModel)
        {
            Result<int> result = await _qualityProfilePreferencesService.AddQualityProfilePreferenceAsync(qualityProfilePreferenceModel);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPut("Put")]
        public async Task<IActionResult> Put([FromBody] UpdateQualityProfilePreferenceModel qualityProfilePreferenceModel)
        {
            Result<int> result = await _qualityProfilePreferencesService.UpdateQualityProfilePrefereceAsync(qualityProfilePreferenceModel);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Result<bool> result = await _qualityProfilePreferencesService.DeleteAsync(id);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpDelete("DeleteQualityProfilePreferences/{entityType}/{entityId}")]
        public async Task<IActionResult> DeleteQualityProfilePreferencesAsync(EntityType entityType, int entityId)
        {
            Result<bool> result = await _qualityProfilePreferencesService.DeleteQualityProfilePreferencesAsync(entityType, entityId);

            return GetActionResult(result);
        }
    }
}
