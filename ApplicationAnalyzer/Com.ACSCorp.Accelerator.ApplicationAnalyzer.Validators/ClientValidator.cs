using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class ClientValidator : AbstractValidator<ClientDTO>
    {
        public const int NameMaxLength = 50;

        public ClientValidator()
        {
            RuleFor(client => client).NotNull().ChildRules((client) =>
            {
                RuleFor(client => client.Name)
                    .NotEmpty()
                    .MaximumLength(NameMaxLength);
            });
        }
    }
}
