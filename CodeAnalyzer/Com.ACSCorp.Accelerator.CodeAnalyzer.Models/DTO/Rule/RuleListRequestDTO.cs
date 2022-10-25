using Com.ACSCorp.Accelerator.Core.Models;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class RuleListRequestDTO
    {
        public string LanguageCode { get; set; }
        public string Severities { get; set; }
        public string SonarSourceSecurities { get; set; }
        public Pagination Pagination { get; set; }
    }
}
