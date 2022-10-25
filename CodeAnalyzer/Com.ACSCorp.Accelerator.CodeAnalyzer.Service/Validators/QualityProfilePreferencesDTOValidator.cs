using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.Validators
{
    public class QualityProfilePreferencesDTOValidator : AbstractValidator<QualityProfilePreferencesRequestDTO>
    {
        public QualityProfilePreferencesDTOValidator()
        {
            RuleFor(d => d.QualityProfileId).GreaterThanOrEqualTo(0).WithMessage(Messages.InvalidQualityProfileId);
            RuleFor(d => d.EntityId).GreaterThanOrEqualTo(0).WithMessage(Messages.InvalidEntityId);
            RuleFor(d => d.EntityType).IsInEnum().WithMessage(Messages.InvalidEntityType);
        }
    }
}
