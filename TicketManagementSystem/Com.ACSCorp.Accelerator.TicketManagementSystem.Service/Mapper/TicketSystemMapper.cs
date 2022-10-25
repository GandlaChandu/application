using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

using Octokit;

using System;
using System.Linq;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Service.Mapper
{
    public static class TicketSystemMapper
    {
        public static TicketSystemIssueModel ToTicketSystemIssue(this IssueTrackerDTO issueTracker, BaseTicketSystemModel baseIssue)
        {
            TicketSystemIssueModel ticketSystemIssue = null;
            if (issueTracker != null)
            {
                ticketSystemIssue = new TicketSystemIssueModel
                {
                    Id = issueTracker.Id,
                    ScanId = issueTracker.ScanId,
                    ScanIssueId = issueTracker.ScanIssueId,
                    ScanType = issueTracker.ScanType,
                    IssueInformation = baseIssue,
                    IsDeleted = issueTracker.IsDeleted,
                    CreatedById = issueTracker.CreatedById,
                    CreatedOn = issueTracker.CreatedOn,
                    ModifiedById = issueTracker.ModifiedById,
                    ModifiedOn = issueTracker.ModifiedOn
                };
            }
            return ticketSystemIssue;
        }

        public static GitHubIssueResponeModel ToGitHubIssueResponse(this Issue issue)
        {
            GitHubIssueResponeModel gitHubIssueRespone = null;
            if (issue != null)
            {
                gitHubIssueRespone = new GitHubIssueResponeModel
                {
                    Type = TicketSystemType.GitHub,
                    Id = issue.Number,
                    Title = issue.Title,
                    Body = issue.Body,
                    Milestone = issue.Milestone?.Number,
                    Assignees = issue.Assignees.Select(s => s.Login),
                    Labels = issue.Labels.Select(s => s.Name),
                    CreatedBy = issue.User.Login,
                    CreatedOn = issue.CreatedAt.DateTime,
                    Status = (int)issue.State.Value,
                    ModifiedOn = issue.UpdatedAt.HasValue ? issue.UpdatedAt.Value.DateTime : null as DateTime?
                };

                if (issue.State.Value == ItemState.Closed)
                {
                    gitHubIssueRespone.ClosedBy = issue.ClosedBy.Login;
                    gitHubIssueRespone.ClosedOn = issue.ClosedAt.Value.DateTime;
                }
            }

            return gitHubIssueRespone;
        }
    }
}
