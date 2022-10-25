using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DivisionController : BaseController
    {
        private readonly IDivisionService _divisionService;

        public DivisionController(IDivisionService divisionService)
        {
            _divisionService = divisionService;
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPost("GetAll/{clientId}")]
        public async Task<IActionResult> GetAll(int clientId, ListParameter listParameter)
        {
            var result = await _divisionService.GetAllAsync(clientId, listParameter);
            return GetActionResult(result);
        }

        [HttpPost("GetAllActive/{clientId}")]
        public async Task<IActionResult> GetAllActive(int clientId)
        {
            Result<List<IdNamePair>> result = await _divisionService.GetAllActiveAsync(clientId);
            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            Result<DivisionDTO> divisionResult = await _divisionService.GetByIdAsync(id);
            return GetActionResult(divisionResult);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPost("Post")]
        public async Task<IActionResult> Post(DivisionDTO divisionDTO)
        {
            Result<int> divisionResult = await _divisionService.AddDivisionAsync(divisionDTO);
            return GetActionResult(divisionResult);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPut("Put")]
        public async Task<IActionResult> Put(DivisionDTO divisionDTO)
        {
            Result<int> divisionResult = await _divisionService.UpdateDivisionAsync(divisionDTO);
            return GetActionResult(divisionResult);
        }
    }
}