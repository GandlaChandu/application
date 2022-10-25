using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class IssueSeverityGroup
    {
        public string Severity { get; set; }
        public int IssueCount { get; set; }
        public List<CweInfoGroupModel> CweList { get; set; }
    }
}
