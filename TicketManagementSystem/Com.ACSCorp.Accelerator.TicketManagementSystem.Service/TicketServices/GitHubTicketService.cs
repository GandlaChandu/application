using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Service.Mapper;

using Microsoft.Extensions.Logging;

using Octokit;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Service
{
    public class GitHubTicketService : BaseTicketService, ITicketService
    {
        #region Variables

        private readonly int _projectId;
        private readonly GitHubTicketSystemConfigurationDTO _gitHubTicketSystemConfiguration;
        private readonly IGitHubClient _gitHubClient;
        private readonly ILogger<GitHubTicketService> _logger;

        #endregion Variables

        #region Constructors

        public GitHubTicketService(
             IHeaderValuesService headerInfo,
             ILogger<GitHubTicketService> logger
            )
        {
            _projectId = headerInfo.ProjectId;
            _gitHubTicketSystemConfiguration = headerInfo.TicketSystemConfiguration.Configuration as GitHubTicketSystemConfigurationDTO;
            _gitHubClient = GetGitHubClient();
            _logger = logger;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<BaseTicketSystemModel>> GetIssueAsync(string number)
        {
            try
            {
                if (!int.TryParse(number, out int issueNumber))
                {
                    return Result.Fail<BaseTicketSystemModel>(Messages.InvalidIssueId);
                }
                Issue issue = await _gitHubClient.Issue.Get(_gitHubTicketSystemConfiguration.Owner, _gitHubTicketSystemConfiguration.Name, issueNumber);

                if (issue == null)
                {
                    return Result.Fail<BaseTicketSystemModel>(Messages.IssueInformationNotFoundOnGitHub);
                }

                GitHubIssueResponeModel gitHubIssueRespone = issue.ToGitHubIssueResponse();

                return Result.Ok(gitHubIssueRespone as BaseTicketSystemModel);
            }
            catch (NotFoundException ex)
            {
                _logger.LogError(ex, Messages.IssueInformationNotFoundOnGitHub);
                return Result.Fail<BaseTicketSystemModel>(Messages.IssueInformationNotFoundOnGitHub);
            }
        }

        public async Task<Result<int>> CreateIssueAsync(TicketSystemIssueModel ticketSystemIssueRequest)
        {
            GitHubIssueRequestModel gitHubIssueRequest = ticketSystemIssueRequest.IssueInformation as GitHubIssueRequestModel;

            var issue = new NewIssue(gitHubIssueRequest.Title)
            {
                Body = gitHubIssueRequest.Body,
                Milestone = gitHubIssueRequest.Milestone
            };

            issue.Assignees.AddRange(gitHubIssueRequest.Assignees);
            issue.Labels.AddRange(gitHubIssueRequest.Labels);

            Issue createdIssue = await _gitHubClient.Issue.Create(_gitHubTicketSystemConfiguration.Owner, _gitHubTicketSystemConfiguration.Name, issue);

            if (createdIssue == null || createdIssue.Number <= 0)
            {
                return Result.Fail<int>(Messages.FailedToCreateGitHubIssue);
            }

            return Result.Ok(createdIssue.Number);
        }

        public async Task<Result<int>> UpdateIssueAsync(UpdateTicketSystemIssueModel ticketSystemIssueRequest)
        {
            GitHubIssueRequestModel gitHubIssueRequest = ticketSystemIssueRequest.IssueInformation as GitHubIssueRequestModel;

            if (gitHubIssueRequest.Id <= 0)
            {
                return Result.Fail<int>(Messages.InvalidGitHubIssueId);
            }

            Issue issue = await _gitHubClient.Issue.Get(_gitHubTicketSystemConfiguration.Owner, _gitHubTicketSystemConfiguration.Name, gitHubIssueRequest.Id);

            if (issue == null)
            {
                return Result.Fail<int>(Messages.IssueNotFoundOnGitHub);
            }

            IssueUpdate issueUpdate = issue.ToUpdate();

            issueUpdate.Title = gitHubIssueRequest.Title;
            issueUpdate.Body = gitHubIssueRequest.Body;
            issueUpdate.Milestone = gitHubIssueRequest.Milestone;

            issueUpdate.ClearAssignees();
            if (gitHubIssueRequest.Assignees != null && gitHubIssueRequest.Assignees.Any())
            {
                foreach (var assignee in gitHubIssueRequest.Assignees)
                {
                    issueUpdate.AddAssignee(assignee);
                }
            }

            issueUpdate.ClearLabels();
            if (gitHubIssueRequest.Labels != null && gitHubIssueRequest.Labels.Any())
            {
                foreach (var label in gitHubIssueRequest.Labels)
                {
                    issueUpdate.AddLabel(label);
                }
            }

            issueUpdate.State = (ItemState)gitHubIssueRequest.Status;
            Issue updatedIssue = await _gitHubClient.Issue.Update(_gitHubTicketSystemConfiguration.Owner, _gitHubTicketSystemConfiguration.Name, gitHubIssueRequest.Id, issueUpdate);

            if (updatedIssue == null || updatedIssue.Number <= 0)
            {
                return Result.Fail<int>(Messages.FailedToCreateGitHubIssue);
            }

            return Result.Ok(updatedIssue.Number);
        }

        public async Task<Result<BaseTicketSystemModel>> GetMetaData()
        {
            try
            {
                GitHubMetaDataModel gitHubMetaData = new GitHubMetaDataModel(TicketSystemType.GitHub);

                var assignessTask = GetAssignees();
                var labelsTask = GetLabels();
                var mileStonesTask = GetMileStones();

                gitHubMetaData.Assignees = await assignessTask;
                gitHubMetaData.Labels = await labelsTask;
                gitHubMetaData.MileStones = await mileStonesTask;
                gitHubMetaData.States = GetStates();

                return Result.Ok(gitHubMetaData as BaseTicketSystemModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return Result.Fail<BaseTicketSystemModel>(Messages.FailedToFetchGitHubMetadata);
            }
        }

        public async Task UpdateIssuesTrackerStatusAsync(IEnumerable<IssueTrackerDTO> issuesTracker)
        {
            var issues = await _gitHubClient.Issue
                            .GetAllForRepository(_gitHubTicketSystemConfiguration.Owner, _gitHubTicketSystemConfiguration.Name);

            foreach (var issue in issuesTracker)
            {
                var gitHubIssue = issues.FirstOrDefault(s => s.Number.ToString() == issue.TicketSystemIssueId);
                if (gitHubIssue != null)
                {
                    issue.Status = gitHubIssue.State.StringValue;
                }
            }
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<List<ListItem<string>>> GetAssignees()
        {
            var assignees = await _gitHubClient.Issue.Assignee.GetAllForRepository(_gitHubTicketSystemConfiguration.Owner, _gitHubTicketSystemConfiguration.Name);
            return assignees.Select(s => new ListItem<string> { Text = s.Name ?? s.Login, Value = s.Login }).ToList();
        }

        private async Task<List<ListItem<string>>> GetLabels()
        {
            var labels = await _gitHubClient.Issue.Labels.GetAllForRepository(_gitHubTicketSystemConfiguration.Owner, _gitHubTicketSystemConfiguration.Name);

            return labels.Select(s => new ListItem<string> { Text = s.Name, Value = s.Name }).ToList();
        }

        private async Task<List<ListItem<int>>> GetMileStones()
        {
            var labels = await _gitHubClient.Issue.Milestone.GetAllForRepository(_gitHubTicketSystemConfiguration.Owner, _gitHubTicketSystemConfiguration.Name);

            return labels.Select(s => new ListItem<int> { Text = s.Title, Value = s.Number }).ToList();
        }

        private List<ListItem<int>> GetStates()
        {
            // TODO- move this logic to core
            List<ListItem<int>> issueStates = new List<ListItem<int>>();
            foreach (var e in Enum.GetValues(typeof(ItemState)))
            {
                issueStates.Add(new ListItem<int> { Text = e.ToString(), Value = (int)e });
            }
            return issueStates;
        }

        private IGitHubClient GetGitHubClient()
        {
            Credentials credentials;
            if (_gitHubTicketSystemConfiguration.IsTokenBased)
            {
                credentials = new Credentials(_gitHubTicketSystemConfiguration.Username);
            }
            else
            {
                credentials = new Credentials(_gitHubTicketSystemConfiguration.Username, _gitHubTicketSystemConfiguration.Password, AuthenticationType.Basic);
            }

            IGitHubClient gitHubClient;
            if (_gitHubTicketSystemConfiguration.IsEnterpriseAccount)
            {
                gitHubClient = new GitHubClient(new ProductHeaderValue(_projectId.ToString()), new Uri(_gitHubTicketSystemConfiguration.EnterpriseUrl)) { Credentials = credentials };
            }
            else
            {
                gitHubClient = new GitHubClient(new ProductHeaderValue(_projectId.ToString())) { Credentials = credentials };
            }
            return gitHubClient;
        }

        #endregion Private Methods
    }
}
