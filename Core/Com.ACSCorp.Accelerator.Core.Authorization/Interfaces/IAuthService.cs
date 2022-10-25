using Com.ACSCorp.Accelerator.Core.Models;

namespace Com.ACSCorp.Accelerator.Core.Authorization.Interfaces
{
    public interface IAuthService
    {
        public Result<bool> ValidateUserToken();
    }
}
