using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : BaseController
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPost("GetAll")]
        public async Task<IActionResult> GetAll(ClientListRequest request)
        {
            var result = await _clientService.GetAllClientsAsync(request);
            return GetActionResult(result);
        }

        [HttpPost("GetAllActive")]
        public async Task<IActionResult> GetAllActive()
        {
            Result<List<IdNamePair>> result = await _clientService.GetAllActiveClientsAsync();
            return GetActionResult(result);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Result<ClientDTO> clientResult = await _clientService.GetClientAsync(id);

            return GetActionResult(clientResult);
        }

        [Authorize(Role.Admin)]
        [HttpPost("Post")]
        public async Task<IActionResult> Post(ClientDTO client)
        {
            Result<int> clientResult = await _clientService.AddClientAsync(client);

            return GetActionResult(clientResult);
        }

        [Authorize(Role.ClientAdmin)]
        [HttpPut("Put")]
        public async Task<IActionResult> Put(ClientDTO client)
        {
            Result<bool> clientResult = await _clientService.UpdateClientAsync(client);

            return GetActionResult(clientResult);
        }
    }
}