using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.Core.Models.Authorization
{
    public class CurrentUserPermissionDTO
    {
        public EntityType EntityType { get; set; }
        public int EntityId { get; set; }
        public Role RoleId { get; set; }
    }
}
