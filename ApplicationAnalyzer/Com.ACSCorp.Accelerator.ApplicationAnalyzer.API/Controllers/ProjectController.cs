using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : BaseController
    {
        private readonly IProjectService _projectService;
        
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("GetAll")]
        public async Task<IActionResult> GetAll(ProjectListRequest request)
        {
            Result<ListResult<ProjectDTO>> result = await _projectService.GetAllProjectsAsync(request);
            return GetActionResult(result);
        }

        //[Authorize(Role.ClientAdmin, Role.ProjectAdmin, Role.ProjectUser)]
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (id > 0)
            {
                Result<ProjectDTO> result = await _projectService.GetProjectAsync(id);
                return GetActionResult(result);
            }
            else
            {
                return BadRequest("Invalid projectId");
            }
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] ProjectDTO project)
        {
            Result<int> result = await _projectService.AddProjectAsync(project);
            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPut("Put")]
        public async Task<IActionResult> Put([FromBody] ProjectDTO project)
        {
            Result<int> result = await _projectService.UpdateProjectAsync(project);
            return GetActionResult(result);
        }

        [HttpPost("GetProjectsByDivisionAndType/{divisionId}")]
        public async Task<IActionResult> GetAllActiveByDivisionId(int divisionId, ScanType? scanType)
        {
            if (divisionId > 0)
            {
                Result<List<IdNamePair>> result = await _projectService.GetAllActiveProjectsByDivisionIdAsync(divisionId, scanType);
                return GetActionResult(result);
            }
            else
            {
                return BadRequest("Invalid divisionId");
            }
        }

        [HttpPost("GetNamesByIds")]
        public async Task<IActionResult> GetNamesByIds(int[] ids)
        {
            Result<List<IdNamePair>> result = await _projectService.GetNamesByIdsAsync(ids);
            return GetActionResult(result);
        }

        [HttpGet("GetStaticScanTypes")]
        public IActionResult GetStaticScanTypes()
        {
            Result<List<IdNamePair>> staticScanTypes = _projectService.GetStaticScanTypes();
            return GetActionResult(staticScanTypes);
        }

        [HttpGet("GetScanTypes")]
        public IActionResult GetScanTypes()
        {
            Result<List<IdNamePair>> scanTypes = _projectService.GetScanTypes();
            return GetActionResult(scanTypes);
        }

        [HttpGet("GetSourceCodeTypes")]
        public IActionResult GetSourceCodeTypes()
        {
            Result<List<IdNamePair>> sourceCodeTypes = _projectService.GetSourceCodeTypes();
            return GetActionResult(sourceCodeTypes);
        }

        [HttpGet("GetSourceControlTypes")]
        public IActionResult GetSourceControlTypes()
        {
            Result<List<IdNamePair>> sourceControlTypes = _projectService.GetSourceControlTypes();
            return GetActionResult(sourceControlTypes);
        }

        [HttpGet("GetTicketSystemType")]
        public IActionResult GetTicketSystemType()
        {
            Result<List<IdNamePair>> result = _projectService.GetTicketSystemTypes();
            return GetActionResult(result);
        }

        [HttpGet("GetByKey/{key}")]
        public async Task<IActionResult> GetProjectByKey(Guid key)
        {
            Result<ProjectDTO> result = await _projectService.GetProjectByKeyAsync(key);
            return GetActionResult(result);
        }
    }
}