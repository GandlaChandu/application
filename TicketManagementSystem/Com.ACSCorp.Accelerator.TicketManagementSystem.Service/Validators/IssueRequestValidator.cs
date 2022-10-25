using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Service.Validators
{
    public class IssueRequestValidator : AbstractValidator<BaseTicketSystemModel>
    {
        public IssueRequestValidator()
        {
            When(t => t.GetType() == typeof(GitHubIssueRequestModel), () =>
            {
                RuleFor(t => (t as GitHubIssueRequestModel).Title)
                    .NotEmpty();

                RuleFor(t => (t as GitHubIssueRequestModel).Body)
                    .NotEmpty();
            });
        }
    }
}
