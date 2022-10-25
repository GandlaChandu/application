using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IUserRoleRepository : IBaseRepository
    {
        public Task<int> AddUserRoleAsync(UserRoleDTO userRoleDTO);

        public Task<bool> AddUserRolesAsync(List<UserRoleDTO> userRoleDTOs);

        public Task<bool> UpdateUserRoleAsync(UserRoleDTO userRoleDTO);

        public Task<UserRoleDTO> GetUserRoleAsync(int id);

        public Task<ListResult<UserRoleResponse>> GetUserRolesByEntityAsync(UserRoleListRequest userRoleListRequest);

        public Task<List<UserRoleDTO>> GetUserRolesByEntityAndUserAsync(int userId, EntityType entityType, int entityId);

        public Task<bool> UpdateUserRolesAsync(List<UserRoleDTO> userRoleDTOs);
    }
}
