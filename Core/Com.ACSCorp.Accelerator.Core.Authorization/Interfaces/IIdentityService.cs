using Com.ACSCorp.Accelerator.Core.Models.Authorization;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.Core.Authorization.Interfaces
{
    public interface IIdentityService
    {
        public CurrentUserDTO GetCurrentUser();
        public int GetCurrentUserId();
        public string GetCurrentUserEmail();
        public void SetUser(CurrentUserDTO user);
        public bool IsAdmin();
        public bool IsClientAdmin();
        public bool IsClientAdmin(int clientId);
        public bool IsProjectAdmin();
        public bool IsProjectAdmin(int projectId);
        public bool IsProjectUser();
        public bool IsProjectUser(int projectId);
        public bool HasPermission(EntityType entityType, int entityId);
        public bool HasPermission(EntityType entityType, int entityId, Role role);
        public bool HasProjectAdminAccess(int projectId, int clientId);
        public bool HasClientAdminAccess(int clientId);
        public List<int> GetAccessibleProjects();
        public List<int> GetAccessibleClients();
        public bool HasProjectAccess(int projectId, int clientId);
    }
}
