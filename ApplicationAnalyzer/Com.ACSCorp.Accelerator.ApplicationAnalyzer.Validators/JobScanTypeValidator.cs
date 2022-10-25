using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.Job;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class JobScanTypeValidator : AbstractValidator<JobScanTypeDTO>
    {
        public JobScanTypeValidator()
        {
            RuleFor(jobScanType => jobScanType).NotNull().ChildRules((jobScanType) =>
            {
                RuleFor(jobScanType => jobScanType.JobId)
                    .NotNull();

                RuleFor(jobScanType => jobScanType.ScanType)
                    .IsInEnum();
            });
        }
    }
}
