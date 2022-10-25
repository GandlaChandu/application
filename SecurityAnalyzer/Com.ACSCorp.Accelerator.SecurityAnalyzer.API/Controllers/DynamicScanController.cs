using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Validators;

using FluentValidation.Results;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicScanController : BaseController
    {
        private readonly IDynamicScanService _dynamicScanService;
        private readonly IDynamicScanDetailService _dynamicScanDetailService;

        public DynamicScanController(
            IDynamicScanService dynamicScanService,
            IDynamicScanDetailService dynamicScanDetailService)
        {
            _dynamicScanService = dynamicScanService;
            _dynamicScanDetailService = dynamicScanDetailService;
        }

        #region Dynamic Scan

        [HttpPost("Post/{projectId}")]
        public async Task<IActionResult> QueueDynamicScanAsync(int projectId)
        {
            var dynamicScanValidator = new DynamicScanValidator();
            ValidationResult validationResult = await dynamicScanValidator.ValidateAsync(projectId);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ToString());
            }

            var result = await _dynamicScanService.QueueDynamicScanAsync(projectId, true);

            return GetActionResult(result);
        }

        [HttpPost("PostSilent/{projectId}")]
        public async Task<IActionResult> QueueDynamicScanSilentAsync(int projectId)
        {
            var dynamicScanValidator = new DynamicScanValidator();
            ValidationResult validationResult = await dynamicScanValidator.ValidateAsync(projectId);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ToString());
            }

            var result = await _dynamicScanService.QueueDynamicScanAsync(projectId);

            return GetActionResult(result);
        }

        [HttpPost("InitiateScan/{scanId}")]
        public async Task<IActionResult> InitiateScan(int scanId)
        {
            var dynamicScanValidator = new DynamicScanValidator();
            ValidationResult validationResult = await dynamicScanValidator.ValidateAsync(scanId);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ToString());
            }

            var result = await _dynamicScanService.InitiateDynamicScanAsync(scanId);

            return GetActionResult(result);
        }

        [HttpPost("GetAll")]
        public async Task<IActionResult> GetDynamicScans(DynamicScanListRequest request)
        {
            var result = await _dynamicScanService.GetDynamicScansAsync(request);

            return GetActionResult(result);
        }

        [HttpPost("Get/{scanId}")]
        public async Task<IActionResult> GetDynamicScanById(int scanId)
        {
            var result = await _dynamicScanService.GetDynamicScanByIdAsync(scanId);

            return GetActionResult(result);
        }

        #endregion Dynamic Scan

        #region Dynamic Scan Details

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("SaveDynamicScanDetails")]
        public async Task<IActionResult> SaveDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails)
        {
            var dynamicScanDetailsValidator = new DynamicScanDetailsValidator();
            ValidationResult validationResult = await dynamicScanDetailsValidator.ValidateAsync(dynamicScanDetails);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ToString());
            }

            var result = await _dynamicScanDetailService.AddDynamicScanDetailsAsync(dynamicScanDetails);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPut("UpdateDynamicScanDetails")]
        public async Task<IActionResult> UpdateDynamicScanDetailsAsync(DynamicScanDetailsDTO dynamicScanDetails)
        {
            var dynamicScanDetailsValidator = new DynamicScanDetailsValidator();
            ValidationResult validationResult = await dynamicScanDetailsValidator.ValidateAsync(dynamicScanDetails);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ToString());
            }

            var result = await _dynamicScanDetailService.UpdateDynamicScanDetailsAsync(dynamicScanDetails);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpGet("GetDynamicScanDetails/{projectId}")]
        public async Task<IActionResult> GetDynamicScanDetails(int projectId)
        {
            var result = await _dynamicScanDetailService.GetDynamicScanDetailsAsync(projectId);

            return GetActionResult(result);
        }

        [HttpPost("GetProjectDynamicScanUrlList")]
        public async Task<IActionResult> GetProjectDynamicScanUrlListAsync(List<int> projectIdList)
        {
            var result = await _dynamicScanDetailService.GetProjectDynamicScanUrlListAsync(projectIdList);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPut("DeleteDynamicScanDetailsById/{id}")]
        public async Task<IActionResult> DeleteDynamicScanDetailsByIdAsync(int id)
        {
            var result = await _dynamicScanDetailService.DeleteDynamicScanDetailsByIdAsync(id);

            return GetActionResult(result);
        }

        #endregion Dynamic Scan Details
    }
}