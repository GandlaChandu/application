
using Com.ACSCorp.Accelerator.Core.Models.DTO;
using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class ProjectDTO : BaseDTO
    {
        public Guid Key { get; set; }
        public int? ClientId { get; set; }
        public string ClientName { get; set; }
        public string DivisionName { get; set; }
        public string Name { get; set; }
        public int DivisionId { get; set; }
    }
}
