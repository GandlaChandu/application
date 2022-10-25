using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.Core.Authorization
{
    public class IdentityService : IIdentityService
    {
        private CurrentUserDTO CurrentUser { get; set; }

        public IdentityService()
        {
        }

        public CurrentUserDTO GetCurrentUser()
        {
            return CurrentUser;
        }

        public int GetCurrentUserId()
        {
            return CurrentUser == null ? default : CurrentUser.Id;
        }

        public string GetCurrentUserEmail()
        {
            return CurrentUser?.Email;
        }

        public bool IsAdmin()
        {
            return CurrentUser.IsAdmin;
        }

        public bool IsClientAdmin()
        {
            return IsInRole(Role.ClientAdmin);
        }

        public bool IsClientAdmin(int clientId)
        {
            return HasPermission(EntityType.Client, clientId, Role.ClientAdmin);
        }

        public bool IsProjectAdmin()
        {
            return IsInRole(Role.ProjectAdmin);
        }

        public bool IsProjectAdmin(int projectId)
        {
            return HasPermission(EntityType.Project, projectId, Role.ProjectAdmin);
        }

        public bool IsProjectUser()
        {
            return IsInRole(Role.ProjectUser);
        }

        public bool IsProjectUser(int projectId)
        {
            return HasPermission(EntityType.Project, projectId, Role.ProjectUser);
        }

        public bool HasPermission(EntityType entityType, int entityId)
        {
            return CurrentUser.UserRoles
                .Any(c => c.EntityId == entityId
                    && c.EntityType == entityType);
        }

        public bool HasPermission(EntityType entityType, int entityId, Role role)
        {
            return CurrentUser.UserRoles
                .Any(c => c.EntityId == entityId
                    && c.EntityType == entityType
                    && c.RoleId == role);
        }

        public void SetUser(CurrentUserDTO currentUser)
        {
            CurrentUser = currentUser;
        }

        public bool HasProjectAdminAccess(int projectId, int clientId)
        {
            return IsAdmin()
                || IsProjectAdmin(projectId)
                || IsClientAdmin(clientId);
        }

        public bool HasProjectAccess(int projectId, int clientId)
        {
            return IsAdmin()
                || IsProjectAdmin(projectId)
                || IsClientAdmin(clientId)
                || IsProjectUser(projectId);
        }

        public bool HasClientAdminAccess(int clientId)
        {
            return IsAdmin()
                || IsClientAdmin(clientId);
        }

        public List<int> GetAccessibleProjects()
        {
            //If logged in user is Admin return null
            if (IsAdmin())
            {
                return null;
            }

            return CurrentUser.UserRoles.Where(c => c.EntityType == EntityType.Project)
                .Select(c => c.EntityId)
                .ToList();
        }

        public List<int> GetAccessibleClients()
        {
            //If logged in user is Admin return null
            if (IsAdmin())
            {
                return null;
            }

            return CurrentUser.UserRoles
                .Where(c => c.EntityType == EntityType.Client)
                .Select(c => c.EntityId)
                .ToList();
        }

        private bool IsInRole(Role role)
        {
            return CurrentUser.UserRoles.Any(c => c.RoleId == role);
        }
    }
}
