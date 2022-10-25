
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.Core.Models.Authorization
{
    public class CurrentUserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
        public List<CurrentUserPermissionDTO> UserRoles { get; set; }
    }
}
