using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class UserRoleResponse
    {
        public int Id { get; set; }
        public UserDTO User { get; set; }
        public Role RoleId { get; set; }
        public string Role { get; set; }
    }
}
