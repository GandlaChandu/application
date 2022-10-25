using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class IssueListParametersDTO
    {
        public Guid ProjectKey { get; set; }
        public string Types { get; set; }
        public string CreatedAfter { get; set; }
        public string CreatedBefore { get; set; }
    }
}
