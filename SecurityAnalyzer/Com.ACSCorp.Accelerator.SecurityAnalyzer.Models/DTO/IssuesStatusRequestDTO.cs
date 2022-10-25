using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class IssuesStatusRequestDTO
    {
        public int ScanId { get; set; }
        public int ScanType { get; set; }
        public IEnumerable<string> IssueIds { get; set; }
    }
}
