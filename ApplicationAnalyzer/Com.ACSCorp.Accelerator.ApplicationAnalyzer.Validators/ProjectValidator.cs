using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class ProjectValidator : AbstractValidator<ProjectDTO>
    {
        public const int ProjectNameMaxLength = 50;

        public ProjectValidator()
        {
            RuleFor(project => project).NotNull().ChildRules((project) =>
            {
                RuleFor(project => project.Name)
                    .NotEmpty()
                    .MaximumLength(ProjectNameMaxLength);
            });
        }
    }
}
