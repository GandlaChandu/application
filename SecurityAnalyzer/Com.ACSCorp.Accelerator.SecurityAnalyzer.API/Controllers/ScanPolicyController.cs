using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScanPolicyController : BaseController
    {
        private readonly IScanPolicyService _scanPolicyService;

        public ScanPolicyController(IScanPolicyService scanPolicyService)
        {
            _scanPolicyService = scanPolicyService;
        }

        [HttpPost("CreateScanPolicy")]
        public async Task<IActionResult> CreateScanPolicy(ScanPolicyDTO scanPolicy)
        {
            Result<int> result = await _scanPolicyService.CreateScanPolicyAsync(scanPolicy);

            return GetActionResult(result);
        }

        [HttpPut("UpdateScanPolicy")]
        public async Task<IActionResult> UpdateScanPolicy(ScanPolicyDTO scanPolicy)
        {
            Result<int> result = await _scanPolicyService.UpdateScanPolicyAsync(scanPolicy);

            return GetActionResult(result);
        }

        [HttpPost("GetScanPolicies")]
        public async Task<IActionResult> GetScanPolicies(ListParameter searchParameter = null)
        {
            Result<ListResult<ScanPolicyDTO>> result = await _scanPolicyService.GetScanPoliciesAsync(searchParameter);

            return GetActionResult(result);
        }

        [HttpGet("GetScanPolicyById/{scanPolicyId}")]
        public async Task<IActionResult> GetScanPolicyNames(int scanPolicyId)
        {
            Result<ScanPolicyDTO> result = await _scanPolicyService.GetScanPolicyByIdAsync(scanPolicyId);

            return GetActionResult(result);
        }

        [HttpGet("GetScanPolicyNames")]
        public IActionResult GetScanPolicyNames()
        {
            Result<List<IdNamePair>> result = _scanPolicyService.GetScanPolicyNames();

            return GetActionResult(result);
        }

        [HttpGet("GetScanPoliciesByEntityId/{entityTypeId}/{entityId}")]
        public IActionResult GetScanPoliciesByEntityId(short entityTypeId, int entityId)
        {
            Result<List<IdNamePair>> result = _scanPolicyService.GetScanPoliciesByEntityId(entityTypeId, entityId);

            return GetActionResult(result);
        }

        [HttpGet("GetScanPolicyThresholdTypes")]
        public IActionResult GetScanPolicyThresholdTypes()
        {
            Result<List<IdNamePair>> result = _scanPolicyService.GetScanPolicyThresholdTypes();

            return GetActionResult(result);
        }

        [HttpGet("GetScanPolicyStrengthTypes")]
        public IActionResult GetScanPolicyStrengthTypes()
        {
            Result<List<IdNamePair>> result = _scanPolicyService.GetScanPolicyStrengthTypes();

            return GetActionResult(result);
        }

        [HttpPost("SaveScanPolicyMapping")]
        public async Task<IActionResult> SaveScanPolicyMapping(ScanPolicyMappingDTO scanPolicyMapping)
        {
            Result<int> result = await _scanPolicyService.SaveScanPolicyMappingAsync(scanPolicyMapping);

            return GetActionResult(result);
        }

        [HttpPut("UpdateScanPolicyMapping")]
        public async Task<IActionResult> UpdateScanPolicyMapping(ScanPolicyMappingDTO scanPolicyMapping)
        {
            Result<int> result = await _scanPolicyService.UpdateScanPolicyMappingAsync(scanPolicyMapping);

            return GetActionResult(result);
        }

        [HttpPut("DeleteScanPolicyMappingById/{id}")]
        public async Task<IActionResult> DeleteScanPolicyMappingByIdAsync(int id)
        {
            var result = await _scanPolicyService.DeleteScanPolicyMappingByIdAsync(id);

            return GetActionResult(result);
        }

        [HttpPut("DeleteScanPolicyMapping")]
        public async Task<IActionResult> DeleteScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping)
        {
            var result = await _scanPolicyService.DeleteScanPolicyMappingAsync(scanPolicyMapping);

            return GetActionResult(result);
        }
    }
}
