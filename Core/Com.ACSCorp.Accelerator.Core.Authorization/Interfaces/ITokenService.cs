using Com.ACSCorp.Accelerator.Core.Models.Authorization;

namespace Com.ACSCorp.Accelerator.Core.Authorization.Interfaces
{
    public interface ITokenService
    {
        public bool IsTokenValid(string bearerToken);
        public ClaimsModel GetUserClaims(string bearerToken);
    }
}
