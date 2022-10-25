using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScanPolicyConfigController : BaseController
    {
        private readonly IScanPolicyConfigService _scanPolicyConfigService;

        public ScanPolicyConfigController(IScanPolicyConfigService configService)
        {
            _scanPolicyConfigService = configService;
        }

        [HttpGet("GetCategoriesByScanPolicyCode")]
        public async Task<IActionResult> GetCategoriesByScanPolicyCode(string scanPolicyCode = null)
        {
            Result<List<CategoryDTO>> result = await _scanPolicyConfigService.GetPoliciesByScanPolicyCodeAsync(scanPolicyCode);
            
            return GetActionResult(result);
        }

        [HttpGet("UpdateCategoryThreshold/{scanPolicyCode}/{categoryId}/{thresholdType}")]
        public async Task<IActionResult> UpdateCategoryThreshold(string scanPolicyCode, int categoryId, ThresholdType thresholdType)
        {
            Result<bool> result = await _scanPolicyConfigService.UpdatePolicyThresholdAsync(scanPolicyCode, categoryId, thresholdType);

            return GetActionResult(result);
        }

        [HttpGet("UpdateCategoryStrength/{scanPolicyCode}/{categoryId}/{strengthType}")]
        public async Task<IActionResult> UpdateCategoryStrength(string scanPolicyCode, int categoryId, StrengthType strengthType)
        {
            Result<bool> result = await _scanPolicyConfigService.UpdatePolicyStrengthAsync(scanPolicyCode, categoryId, strengthType);

            return GetActionResult(result);
        }

        [HttpPost("EnableCategories/{categoryIds}")]
        public async Task<IActionResult> EnableCategories(string scanPolicyCode, int[] categoryIds)
        {
            Result<bool> result = await _scanPolicyConfigService.EnablePoliciesAsync(scanPolicyCode, categoryIds);

            return GetActionResult(result);
        }

        [HttpGet("GetScannersByCategoryId/{scanPolicyCode}/{categoryId}")]
        public async Task<IActionResult> GetScannersByCategoryId(string scanPolicyCode, int categoryId)
        {
            Result<List<ScannerDTO>> result = await _scanPolicyConfigService.GetScannersByPolicyIdAsync(scanPolicyCode, categoryId);

            return GetActionResult(result);
        }

        [HttpGet("UpdateScannerThreshold/{scanPolicyCode}/{scannerId}/{thresholdType}")]
        public async Task<IActionResult> UpdateScannerThreshold(string scanPolicyCode, int scannerId, ThresholdType thresholdType)
        {
            Result<bool> result = await _scanPolicyConfigService.UpdateScannerThresholdAsync(scanPolicyCode, scannerId, thresholdType);

            return GetActionResult(result);
        }

        [HttpGet("UpdateScannerStrength/{scanPolicyCode}/{scannerId}/{strengthType}")]
        public async Task<IActionResult> UpdateScannerStrength(string scanPolicyCode, int scannerId, StrengthType strengthType)
        {
            Result<bool> result = await _scanPolicyConfigService.UpdateScannerStrengthAsync(scanPolicyCode, scannerId, strengthType);

            return GetActionResult(result);
        }

        [HttpDelete("DeleteScanPolicy/{scanPolicyCode}")]
        public async Task<IActionResult> DeleteScanPolicy(string scanPolicyCode)
        {
            Result<bool> result = await _scanPolicyConfigService.DeleteScanPolicyAsync(scanPolicyCode);

            return GetActionResult(result);
        }
    }
}
