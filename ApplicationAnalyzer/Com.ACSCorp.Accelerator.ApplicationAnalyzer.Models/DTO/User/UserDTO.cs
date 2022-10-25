using Com.ACSCorp.Accelerator.Core.Models.DTO;

using System.Collections.Generic;
using System.Linq;

using Enums = Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User
{
    public class UserDTO : BaseDTO
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
        public List<UserPermissionDTO> UserRoles { get; set; }
        public Enums.Role? Role
        {
            get
            {
                if (IsAdmin)
                {
                    return Enums.Role.Admin;
                }
                else if (UserRoles.Any(c => c.RoleId == Enums.Role.ClientAdmin))
                {
                    return Enums.Role.ClientAdmin;
                }
                else if (UserRoles.Any(c => c.RoleId == Enums.Role.ProjectAdmin))
                {
                    return Enums.Role.ProjectAdmin;
                }
                else if (UserRoles.Any(c => c.RoleId == Enums.Role.ProjectUser))
                {
                    return Enums.Role.ProjectUser;
                }
                return null;
            }
        }
    }
}
