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
    public class UserRoleController : BaseController
    {
        private readonly IUserRoleService _userRoleService;

        public UserRoleController(IUserRoleService userRoleService)
        {
            _userRoleService = userRoleService;
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("Post")]
        public async Task<IActionResult> AddUserRole(UserRoleDTO userRoleDTO)
        {
            Result<int> result = await _userRoleService.AddUserRoleAsync(userRoleDTO);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("SaveUserRoles")]
        public async Task<IActionResult> SaveUserRoles(List<UserRoleDTO> userRoleDTOs)
        {
            Result<bool> result = await _userRoleService.SaveUserRolesAsync(userRoleDTOs);

            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("GetAll")]
        public async Task<IActionResult> GetUserRolesAsync(UserRoleListRequest userRoleListRequest)
        {
            Result<ListResult<UserRoleResponse>> userRolesResult = await _userRoleService.GetUserRolesByEntityAsync(userRoleListRequest);

            return GetActionResult(userRolesResult);
        }

        [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Result<bool> result = await _userRoleService.RemoveUserRoleAsync(id);

            return GetActionResult(result);
        }
    }
}