using Com.ACSCorp.Accelerator.Core.Models;

using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class RuleListRequestModel
    {
        [Range(1, int.MaxValue, ErrorMessage = "LanguageId is required and greater than 0.")]
        public int LanguageId { get; set; }

        public string Severities { get; set; }

        public string SonarSourceSecurities { get; set; }

        [Required(ErrorMessage = "Pagination is required")]
        public Pagination Pagination { get; set; }
    }
}
