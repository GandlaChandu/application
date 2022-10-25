using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Com.ACSCorp.Accelerator.Core.Dependencies.Filters
{
    public class AuthorizeAttribute : TypeFilterAttribute
    {
        public AuthorizeAttribute(params Role[] allowedRoles) : base(typeof(AuthorizeRolesActionFilter))
        {
            Arguments = new object[] { allowedRoles };
        }
    }

    public class AuthorizeRolesActionFilter : IAuthorizationFilter
    {
        private Role[] AllowedRoles { get; set; }

        public AuthorizeRolesActionFilter(params Role[] allowedRoles)
        {
            AllowedRoles = allowedRoles;
        }

        /// <summary>
        /// On Authorization
        /// </summary>
        /// <param name="context"></param>
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            IIdentityService identityService = context.HttpContext.RequestServices.GetService(typeof(IIdentityService)) as IIdentityService;

            CurrentUserDTO currentUserDTO = identityService.GetCurrentUser();
            if (currentUserDTO == null)
            {
                context.Result = new UnauthorizedResult();
            }

            bool userPermitted = IsUserRolePermitted(currentUserDTO);
            if (!userPermitted)
            {
                context.Result = new UnauthorizedResult();
            }
        }

        private bool IsUserRolePermitted(CurrentUserDTO userDTO)
        {
            // If no roles are defined then allow access
            if (AllowedRoles == null || AllowedRoles.Length == 0)
            {
                return true;
            }

            // If user is not present then restrict the access
            if (userDTO == null)
            {
                return false;
            }

            // If user is Admin then allow the access
            if (userDTO.IsAdmin)
            {
                return true;
            }

            if (userDTO.UserRoles == null || userDTO.UserRoles.Count == 0)
            {
                return false;
            }

            foreach (Role allowedRole in AllowedRoles)
            {
                int matchIndex = userDTO.UserRoles.FindIndex(r => r.RoleId == allowedRole);
                if (matchIndex > -1)
                {
                    return true;
                }
            }

            return false;
        }
    }
}
