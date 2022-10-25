using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class DivisionValidator : AbstractValidator<DivisionDTO>
    {
        public const int NameMaxLength = 50;

        public DivisionValidator()
        {
            RuleFor(division => division).NotNull().ChildRules((division) =>
            {
                RuleFor(division => division.Name)
                    .NotEmpty()
                    .MaximumLength(NameMaxLength);

                RuleFor(division => division.ClientId)
                    .NotNull()
                    .GreaterThan(0);
            });
        }
    }
}
