using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

using System.Threading.Tasks;

using Authorization = Com.ACSCorp.Accelerator.Core.Models.Authorization;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeController : BaseController
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public MeController(IHttpContextAccessor httpContextAccessor,
            IUserService userService,
            ITokenService tokenService)
        {
            _httpContextAccessor = httpContextAccessor;
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string bearerToken = _httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Authorization];

            bool isValidToken = _tokenService.IsTokenValid(bearerToken);
            if (!isValidToken)
            {
                return Unauthorized("Token is invalid or expired");
            }

            Authorization.ClaimsModel claims = _tokenService.GetUserClaims(bearerToken);
            if (claims == null || string.IsNullOrWhiteSpace(claims.Email))
            {
                return Unauthorized("User does not have email claim");
            }

            Result<UserDTO> user = await _userService.GetByEmailAsync(claims.Email);
            return GetActionResult(user);
        }
    }
}