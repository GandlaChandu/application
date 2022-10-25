using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class UserPermissionDTO
    {
        public EntityType EntityType { get; set; }
        public int EntityId { get; set; }
        public Role RoleId { get; set; }
    }
}
