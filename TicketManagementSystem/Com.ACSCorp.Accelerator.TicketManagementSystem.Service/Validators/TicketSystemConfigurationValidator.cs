using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Service.Validators
{
    public class TicketSystemConfigurationValidator : AbstractValidator<TicketSystemConfigurationDTO>
    {
        public TicketSystemConfigurationValidator()
        {
            RuleFor(t => t.Type).IsInEnum();

            RuleFor(t => t.ProjectId)
                .GreaterThanOrEqualTo(0);

            When(t => t.Configuration.GetType() == typeof(GitHubTicketSystemConfigurationDTO), () =>
            {
                RuleFor(g => (g.Configuration as GitHubTicketSystemConfigurationDTO).Owner)
                    .NotEmpty();

                RuleFor(g => (g.Configuration as GitHubTicketSystemConfigurationDTO).Name)
                    .NotEmpty();

                RuleFor(g => (g.Configuration as GitHubTicketSystemConfigurationDTO).EnterpriseUrl)
                    .Matches(@"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)")
                    .When(g => (g.Configuration as GitHubTicketSystemConfigurationDTO).IsEnterpriseAccount);

                RuleFor(g => (g.Configuration as GitHubTicketSystemConfigurationDTO).Username)
                    .NotEmpty();

                RuleFor(g => (g.Configuration as GitHubTicketSystemConfigurationDTO).Password)
                    .NotEmpty()
                    .When(g => !(g.Configuration as GitHubTicketSystemConfigurationDTO).IsTokenBased);
            });
        }
    }
}
