using System;
using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class RuleActivationRequestModel
    {
        [Range(1, int.MaxValue, ErrorMessage = "QualityProfileId is required and should be greater than 0.")]
        public int QualityProfileId { get; set; }

        [Required(ErrorMessage = "RuleKey is required.")]
        public string RuleKey { get; set; }

        public bool IsActive { get; set; }
    }
}
