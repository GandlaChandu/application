using Com.ACSCorp.Accelerator.Core.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO
{
    public class AlertDTO : BaseDTO
    {
        public string AlertMessage { get; set; }
        public RiskLevel Risk { get; set; }
        public ConfidenceLevel Confidence { get; set; }
        public string Url { get; set; }
        public string Other { get; set; }
        public string Parameter { get; set; }
        public string Attack { get; set; }
        public string Evidence { get; set; }
        public string Description { get; set; }
        public string Reference { get; set; }
        public string Solution { get; set; }
        public int CWEId { get; set; }
        public int WASCId { get; set; }
    }
}
