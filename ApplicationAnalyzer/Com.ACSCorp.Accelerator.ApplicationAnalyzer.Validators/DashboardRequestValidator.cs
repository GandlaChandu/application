using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class DashboardRequestValidator : AbstractValidator<DashboardRequest>
    {
        public DashboardRequestValidator()
        {
            RuleFor(request => request).NotNull().ChildRules((request) =>
            {
                When(request => request.StartDate.HasValue && request.EndDate.HasValue, () =>
                {
                    RuleFor(request => request.EndDate.Value.Date)
                        .GreaterThanOrEqualTo(jobSchedule => jobSchedule.StartDate.Value.Date);
                });
            });
        }
    }
}
