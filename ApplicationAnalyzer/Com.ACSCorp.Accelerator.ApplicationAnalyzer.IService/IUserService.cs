using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.Core.Models;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IUserService
    {
        public Task<Result<ListResult<UserDTO>>> GetAllUsersAsync(UserListRequest userListRequest);
        public Task<Result<UserDTO>> GetByIdAsync(int userId);
        public Task<Result<int>> AddUserAsync(UserDTO userDTO);
        public Task<Result<int>> UpdateUserAsync(UserDTO userDTO);
        public Task<Result<bool>> DeleteUserAsync(int id);
        public Task<Result<UserDTO>> GetByEmailAsync(string email);
    }
}
