using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class UserRoleDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public EntityType EntityType { get; set; }
        public int EntityId { get; set; }
        public Role RoleId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
