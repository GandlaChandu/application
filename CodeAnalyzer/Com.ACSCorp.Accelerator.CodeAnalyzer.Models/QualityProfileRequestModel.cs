using System;
using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfileRequestModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "LanguageId should be greater than 0.")]
        public short LanguageId { get; set; }
        public int? ClientId { get; set; }
    }
}
