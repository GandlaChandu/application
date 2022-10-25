using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class SeverityGroupIssue
    {
        public string Severity { get; set; }
        public int IssueCount { get; set; }
        public List<CweInfoGroupModel> CweList { get; set; }
    }
}
