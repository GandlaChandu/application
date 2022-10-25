using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Validators
{
    public class StaticScanDetailsValidator : AbstractValidator<StaticScanDetailsDTO>
    {
        public const int CodeUrlMaxLength = 200;
        public const int UserNameMaxLength = 100;
        public const int PasswordMaxLength = 100;

        public StaticScanDetailsValidator()
        {
            RuleFor(staticScan => staticScan).NotNull().ChildRules((staticScan) =>
            {
                RuleFor(staticScan => staticScan.ProjectId)
                    .GreaterThan(0);

                RuleFor(staticScan => staticScan.CodeOrCodeURL)
                    .NotEmpty()
                    .MaximumLength(CodeUrlMaxLength);

                RuleFor(staticScan => staticScan.UserName)
                    .NotEmpty()
                    .MaximumLength(UserNameMaxLength);

                RuleFor(staticScan => staticScan.Password)
                    .NotEmpty()
                    .MaximumLength(PasswordMaxLength)
                    .When(staticScan => !staticScan.IsTokenBased);

                RuleFor(staticScan => staticScan.SourceCodeType)
                    .IsInEnum();

                RuleFor(staticScan => staticScan.SourceControlType)
                    .IsInEnum();
            });
        }
    }
}
