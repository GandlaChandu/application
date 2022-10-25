using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class UserRoleListRequest
    {
        public EntityType EntityType { get; set; }
        public int EntityId { get; set; }
        public ListParameter ListParameter { get; set; }
    }
}
