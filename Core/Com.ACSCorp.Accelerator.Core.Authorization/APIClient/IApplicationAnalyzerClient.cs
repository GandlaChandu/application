using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;

namespace Com.ACSCorp.Accelerator.Core.Authorization.APIClient
{
    public interface IApplicationAnalyzerClient
    {
        public Result<CurrentUserDTO> GetUserByTokenAsync(string bearerToken);
    }
}
