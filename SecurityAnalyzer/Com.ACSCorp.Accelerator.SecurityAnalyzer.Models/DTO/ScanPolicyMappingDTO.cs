using Com.ACSCorp.Accelerator.Core.Models.DTO;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO
{
    public class ScanPolicyMappingDTO : BaseDTO
    {
        public EntityType EntityTypeId { get; set; }
        public int EntityId { get; set; }
        public int ScanPolicyId { get; set; }
    }
}
