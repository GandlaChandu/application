using System;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO
{
    public class ScanPolicyDTO : BasePolicyDTO
    {
        public string Name { get; set; }
        public Guid ScanPolicyCode { get; set; }
        public int? ClientId { get; set; }
    }
}
