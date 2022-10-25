using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IUserRepository : IBaseRepository
    {
        public Task<ListResult<UserDTO>> GetAllUsersAsync(UserListRequest userListRequest);
        public Task<UserDTO> GetByIdAsync(int userId);
        public Task<int> AddUserAsync(UserDTO userDTO);
        public Task<int> UpdateUserAsync(UserDTO userDTO);
        public Task<UserDTO> GetByEmailAsync(string email);
        public Task<UserDTO> GetRolesByEmailAsync(string email);
    }
}
