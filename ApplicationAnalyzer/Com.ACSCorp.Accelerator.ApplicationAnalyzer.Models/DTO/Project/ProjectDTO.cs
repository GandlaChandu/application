using Com.ACSCorp.Accelerator.Core.Models.DTO;
using System;
using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class ProjectDTO : BaseDTO
    {
        [Range(1, int.MaxValue, ErrorMessage = "ClientId is required and should be greater than 0.")]
        public int? ClientId { get; set; }
        public string ClientName { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "DivisionId is required and should be greater than 0.")]
        public int DivisionId { get; set; }
        public string DivisionName { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }
        public Guid Key { get; set; }
        public bool IsActive { get; set; }
    }
}
