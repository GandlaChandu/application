using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO.Issue
{
    public class IssuesStatusRequestDTO
    {
        public int ScanId { get; set; }
        public int ScanType { get; set; }
        public IEnumerable<string> IssueIds { get; set; }
    }
}
