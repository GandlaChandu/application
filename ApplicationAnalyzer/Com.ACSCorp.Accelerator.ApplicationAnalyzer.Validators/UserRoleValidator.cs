using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;

using FluentValidation;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators
{
    public class UserRoleValidator : AbstractValidator<UserRoleDTO>
    {
        public UserRoleValidator()
        {
            RuleFor(userRole => userRole).NotNull().ChildRules((userRole) =>
            {
                RuleFor(userRole => userRole.UserId)
                    .NotNull()
                    .GreaterThan(0);

                RuleFor(userRole => userRole.EntityType)
                    .NotNull()
                    .IsInEnum();

                RuleFor(userDTO => userDTO.EntityId)
                    .NotNull()
                    .GreaterThan(0);

                RuleFor(userDTO => userDTO.RoleId)
                    .NotNull()
                    .IsInEnum();
            });
        }
    }

    public class UserRoleListValidator : AbstractValidator<List<UserRoleDTO>>
    {
        public UserRoleListValidator()
        {
            RuleFor(userRoles => userRoles).NotNull().ChildRules((userRole) =>
            {
                When(userRoles => userRoles != null, () =>
                {
                    RuleFor(userRoles => userRoles.Count)
                        .GreaterThan(0);

                    RuleForEach(userRoles => userRoles)
                        .SetValidator(new UserRoleValidator());
                });
            });
        }
    }
}
