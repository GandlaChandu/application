using Com.ACSCorp.Accelerator.Core.Models.DTO;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfileResponseModel : BaseDTO
    {
        public string Name { get; set; }
        public short LanguageId { get; set; }
        public string LanguageName { get; set; }
    }
}
