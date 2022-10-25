using FluentValidation;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Validators
{
    public class DynamicScanValidator : AbstractValidator<int>
    {
        public const string ProjectIdDisplayName = "Project Id";

        public DynamicScanValidator()
        {
            RuleFor(projectId => projectId).NotNull().WithName(ProjectIdDisplayName).ChildRules((division) =>
            {
                RuleFor(projectId => projectId).GreaterThan(0).WithName(ProjectIdDisplayName);
            });
        }
    }
}
