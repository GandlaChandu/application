using Com.ACSCorp.Accelerator.Core.Models;

using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfileListRequest
    {
        [Required(ErrorMessage = "ListParameter is required.")]
        public ListParameter ListParameter { get; set; }
    }
}
