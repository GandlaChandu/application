using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Role.Admin, Role.ClientAdmin, Role.ProjectAdmin)]
        [HttpPost("GetAll")]
        public async Task<IActionResult> GetAllAsync(UserListRequest userListRequest)
        {
            Result<ListResult<UserDTO>> users = await _userService.GetAllUsersAsync(userListRequest);
            return GetActionResult(users);
        }

        //[Authorize(Role.Admin)]
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            Result<UserDTO> user = await _userService.GetByIdAsync(id);
            return GetActionResult(user);
        }

        [Authorize(Role.Admin)]
        [HttpPost("Post")]
        public async Task<IActionResult> AddUserAsync(UserDTO userDTO)
        {
            Result<int> result = await _userService.AddUserAsync(userDTO);
            return GetActionResult(result);
        }

        [Authorize(Role.Admin)]
        [HttpPut("Put")]
        public async Task<IActionResult> UpdateUserAsync(UserDTO userDTO)
        {
            Result<int> result = await _userService.UpdateUserAsync(userDTO);
            return GetActionResult(result);
        }

        [Authorize(Role.Admin)]
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteUserAsync(int id)
        {
            Result<bool> result = await _userService.DeleteUserAsync(id);
            return GetActionResult(result);
        }
    }
}