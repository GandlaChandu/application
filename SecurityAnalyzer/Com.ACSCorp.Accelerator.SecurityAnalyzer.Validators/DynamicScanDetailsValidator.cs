using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Validators
{
    public class DynamicScanDetailsValidator : AbstractValidator<DynamicScanDetailsDTO>
    {
        public DynamicScanDetailsValidator()
        {
            RuleFor(dynamicScan => dynamicScan).NotNull().ChildRules((dynamicScan) =>
            {
                RuleFor(dynamicScan => dynamicScan.ApplicationURL)
                    .NotEmpty()
                    .MaximumLength(Constants.DynamicScanValidatorConstants.DynamicScanApplicationURLMaxLength);

                RuleFor(dynamicScan => dynamicScan.UserName)
                    .NotEmpty();

                RuleFor(dynamicScan => dynamicScan.Password)
                    .NotEmpty();
            });
        }
    }
}
