using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IUserRoleService
    {
        public Task<Result<int>> AddUserRoleAsync(UserRoleDTO userRoleDTO);
        public Task<Result<bool>> SaveUserRolesAsync(List<UserRoleDTO> userRoleDTOs);

        public Task<Result<ListResult<UserRoleResponse>>> GetUserRolesByEntityAsync(UserRoleListRequest userRoleListRequest);

        public Task<Result<bool>> RemoveUserRoleAsync(int id);
    }
}
