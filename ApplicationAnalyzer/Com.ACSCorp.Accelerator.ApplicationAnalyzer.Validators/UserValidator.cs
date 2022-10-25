using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;

using FluentValidation;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class UserValidator : AbstractValidator<UserDTO>
    {
        public const int EmailMaxLength = 150;
        public const int NameMaxLength = 100;

        public UserValidator()
        {
            RuleFor(user => user).NotNull().ChildRules((user) =>
            {
                RuleFor(user => user.Email)
                    .NotEmpty()
                    .MaximumLength(EmailMaxLength)
                    .Matches(Constant.EmailRegex);

                RuleFor(user => user.FirstName)
                    .NotEmpty()
                    .MaximumLength(NameMaxLength);

                RuleFor(user => user.LastName)
                    .NotEmpty()
                    .MaximumLength(NameMaxLength);
            });
        }
    }
}
