using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
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
    public class StaticScanController : BaseController
    {
        private readonly IStaticScanService _staticScanService;
        private readonly IStaticScanDetailService _staticScanDetailService;

        public StaticScanController(
            IStaticScanService staticScanService,
            IStaticScanDetailService staticScanDetailService)
        {
            _staticScanService = staticScanService;
            _staticScanDetailService = staticScanDetailService;
        }

        #region Static Scan

        [HttpPost("GetAll")]
        public async Task<IActionResult> GetAll(StaticScanListRequest staticScanListRequest)
        {
            Result<ListResult<StaticScanDTO>> result = await _staticScanService.GetAllScansAsync(staticScanListRequest);

            return GetActionResult(result);
        }

        [HttpGet("Get/{scanId}")]
        public async Task<IActionResult> Get(int scanId)
        {
            Result<StaticScanDTO> result = await _staticScanService.GetStaticScanAsync(scanId);

            return GetActionResult(result);
        }

        [HttpPost("Post/{projectId}")]
        public async Task<IActionResult> Post(int projectId)
        {
            if (projectId <= 0)
            {
                return BadRequest(Messages.InvalidProjectId);
            }

            Result<int> result = await _staticScanService.AddStaticScanAsync(projectId, true);

            return GetActionResult(result);
        }

        [HttpPost("PostSilent/{projectId}")]
        public async Task<IActionResult> PostSilent(int projectId)
        {
            if (projectId <= 0)
            {
                return BadRequest(Messages.InvalidProjectId);
            }

            Result<int> result = await _staticScanService.AddStaticScanAsync(projectId);

            return GetActionResult(result);
        }

        [HttpPost("InitiateStaticScan/{staticScanId}")]
        public async Task<IActionResult> InitiateStaticScan(int staticScanId)
        {
            return Ok(await _staticScanService.InitiateStaticScanAsync(staticScanId));
        }

        /// <summary>
        /// StaticScanAnalysis webhook
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        [HttpPost("StaticScanAnalysis")]
        public async Task StaticScanAnalysis(SonarQubeCallbackModel result)
        {
            await _staticScanService.SaveStaticScanAnalysisStatus(result);
        }

        #endregion Static Scan

        #region Static Scan Details

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("SaveStaticScanDetails")]
        public async Task<IActionResult> SaveStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails)
        {
            Result result = await _staticScanDetailService.AddStaticScanDetailsAsync(staticScanDetails);

            ///TODO: Need to return result.Value
            if (result.IsSucceeded)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.GetErrorString());
            }
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPut("UpdateStaticScanDetails")]
        public async Task<IActionResult> UpdateStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails)
        {
            Result result = await _staticScanDetailService.UpdateStaticScanDetailsAsync(staticScanDetails);
            ///TODO: Need to return result.Value
            if (result.IsSucceeded)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result.GetErrorString());
            }
        }

        //[HttpGet("GetStaticScanDetailsById/{id}")]
        //public IActionResult GetStaticScanDetailsById(int id)
        //{
        //    return Ok(_staticScanService.GetStaticScanDetailById(id));
        //}

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpGet("GetStaticScanDetailsByProjectId/{projectId}")]
        public async Task<IActionResult> GetStaticScanDetailsByProjectId(int projectId)
        {
            Result<StaticScanDetailsDTO> staticScanDetailsDTOResult = await _staticScanDetailService.GetStaticScanDetailsByProjectIdAsync(projectId);
            return GetActionResult(staticScanDetailsDTOResult);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPut("DeleteStaticScanDetailsById/{id}")]
        public async Task<IActionResult> DeleteStaticScanDetailsByIdAsync(int id)
        {
            var result = await _staticScanDetailService.DeleteStaticScanDetailsByIdAsync(id);

            return GetActionResult(result);
        }

        [HttpPost("GetProjectStaticScanUrlList")]
        public async Task<IActionResult> GetProjectStaticScanUrlListAsync(List<int> projectIdList)
        {
            var result = await _staticScanDetailService.GetProjectStaticScanUrlListAsync(projectIdList);

            return GetActionResult(result);
        }

        #endregion Static Scan Details
    }
}