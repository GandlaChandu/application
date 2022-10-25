using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class JobValidator : AbstractValidator<JobDTO>
    {
        public const int NameMaxLength = 50;

        public JobValidator()
        {
            RuleFor(job => job).NotNull().ChildRules((job) =>
            {
                RuleFor(job => job.Name)
                    .NotEmpty()
                    .MaximumLength(NameMaxLength);

                RuleFor(job => job.ProjectId)
                    .NotNull()
                    .GreaterThan(0);

                RuleFor(job => job.ScanTypes)
                    .NotNull();

                When(job => job.ScanTypes != null, () =>
                {
                    RuleFor(job => job.ScanTypes.Count)
                        .GreaterThan(0);

                    RuleForEach(job => job.ScanTypes)
                        .SetValidator(new JobScanTypeValidator());
                });

                RuleFor(job => job.Schedule)
                    .SetValidator(new JobScheduleValidator());
            });
        }
    }
}
