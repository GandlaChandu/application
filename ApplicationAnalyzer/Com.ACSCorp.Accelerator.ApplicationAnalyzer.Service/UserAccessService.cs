using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class UserAccessService : IUserAccessService
    {
        #region Variables

        private readonly IIdentityService _identityService;
        private readonly IProjectService _projectService;

        #endregion Variables

        #region Constructors

        public UserAccessService(
            IIdentityService identityService,
            IProjectService projectService)
        {
            _identityService = identityService;
            _projectService = projectService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<List<int>> GetAllAccessibleClientsAsync()
        {
            if (_identityService.IsAdmin())
            {
                // Returning null so that all clients will be considered
                return null;
            }

            // Direct accessible clients
            List<int> accessibleClients = _identityService.GetAccessibleClients();

            // Indirect client access based on project access
            Result<List<int>> indirectAccessibleClientsResult = await _projectService.GetClientIdsByProjectIdsAsync(_identityService.GetAccessibleProjects());

            if (indirectAccessibleClientsResult.IsSucceeded
                && indirectAccessibleClientsResult.Value != null)
            {
                accessibleClients.AddRange(indirectAccessibleClientsResult.Value);
            }

            return accessibleClients;
        }

        #endregion Public Methods
    }
}
