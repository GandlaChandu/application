using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.JobSchedule;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class JobScheduleValidator : AbstractValidator<JobScheduleDTO>
    {
        public JobScheduleValidator()
        {
            RuleFor(jobSchedule => jobSchedule).NotNull().ChildRules((jobSchedule) =>
            {
                RuleFor(jobSchedule => jobSchedule.CronSchedule)
                    .NotEmpty();

                RuleFor(jobSchedule => jobSchedule.StartDate)
                    .NotNull();

                RuleFor(jobSchedule => jobSchedule.EndDate)
                    .NotNull()
                    .GreaterThanOrEqualTo(jobSchedule => jobSchedule.StartDate);
            });
        }
    }
}
