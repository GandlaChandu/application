using System;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO
{
    public class GitHubIssueResponeModel : BaseGitHubIssueModel
    {
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public DateTime? ClosedOn { get; set; }
        public string ClosedBy { get; set; }
    }
}
