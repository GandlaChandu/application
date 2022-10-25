using Com.ACSCorp.Accelerator.Core.Dependencies.Filters;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Role.ClientAdmin, Role.ProjectAdmin)]
    [ApiController]
    public class TicketSystemConfigurationController : BaseController
    {
        private readonly ITicketSystemConfigurationService _ticketSystemConfigService;

        public TicketSystemConfigurationController(ITicketSystemConfigurationService ticketSystemConfigService)
        {
            _ticketSystemConfigService = ticketSystemConfigService;
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetTicketSystemConfiguration(int id)
        {
            var result = await _ticketSystemConfigService.GetTicketSystemConfigurationByProjectIdAsync(id);

            return GetActionResult(result);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateTicketSystemConfiguration([FromBody] TicketSystemConfigurationDTO ticketSystemConfiguration)
        {
            var result = await _ticketSystemConfigService.CreateTicketSystemConfiguration(ticketSystemConfiguration);

            return GetActionResult(result);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateTicketSystemConfiguration([FromBody] TicketSystemConfigurationDTO ticketSystemConfiguration)
        {
            var result = await _ticketSystemConfigService.UpdateTicketSystemConfigurationAsync(ticketSystemConfiguration);

            return GetActionResult(result);
        }

        [HttpPut("Delete/{id}")]
        public async Task<IActionResult> DeleteTicketSystemConfiguration(int id)
        {
            var result = await _ticketSystemConfigService.DeleteTicketSystemConfigurationAsync(id);

            return GetActionResult(result);
        }
    }
}
