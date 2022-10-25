using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models
{
    public class BaseGitHubIssueModel:BaseTicketSystemModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public IEnumerable<string> Assignees { get; set; }
        public int? Milestone { get; set; }
        public IEnumerable<string> Labels { get; set; }
        public int Status { get; set; }
    }
}
