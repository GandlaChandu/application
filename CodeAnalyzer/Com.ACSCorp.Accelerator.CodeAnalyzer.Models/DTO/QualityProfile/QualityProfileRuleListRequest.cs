using Com.ACSCorp.Accelerator.Core.Models;

using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfileRuleListRequest
    {
        [Range(1, int.MaxValue, ErrorMessage = "QualityProfileId is required and should be greater than 0.")]
        public int QualityProfileId { get; set; }
        public Pagination Pagination { get; set; }
    }
}
