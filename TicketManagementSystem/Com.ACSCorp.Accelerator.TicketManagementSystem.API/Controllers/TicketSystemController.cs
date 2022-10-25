using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketSystemController : BaseController
    {
        private readonly ITicketSystemService _ticketSystemService;

        public TicketSystemController(ITicketSystemService ticketSystemService)
        {
            _ticketSystemService = ticketSystemService;
        }

        [HttpGet("GetIssueById/{id}")]
        public async Task<IActionResult> GetIssueById(int id)
        {
            var result = await _ticketSystemService.GetIssueByIdAsync(id);

            return GetActionResult(result);
        }

        [HttpPost("CreateIssue")]
        public async Task<IActionResult> CreateIssue([FromBody] TicketSystemIssueModel issueRequest)
        {
            var result = await _ticketSystemService.CreateIssueAsync(issueRequest);

            return GetActionResult(result);
        }

        [HttpPut("UpdateIssue")]
        public async Task<IActionResult> UpdateIssue([FromBody] UpdateTicketSystemIssueModel ticketSystemIssueRequest)
        {
            var result = await _ticketSystemService.UpdateIssueAsync(ticketSystemIssueRequest);

            return GetActionResult(result);
        }

        [HttpGet("GetIssueMetaData")]
        public async Task<IActionResult> GetIssueMetaData()
        {
            var result = await _ticketSystemService.GetIssueMetaData();

            return GetActionResult(result);
        }

        [HttpPost("GetIssuesStatus")]
        public async Task<IActionResult> GetIssuesStatus(IssuesResultRequestDTO issueResultsRequest)
        {
            var result = await _ticketSystemService.GetIssuesResult(issueResultsRequest);

            return GetActionResult(result);
        }

        [HttpGet("GetIssueTracker/{id}")]
        public async Task<IActionResult> GetIssueTracker(int id)
        {
            var result = await _ticketSystemService.GetIssueTrackerAsync(id);

            return GetActionResult(result);
        }
    }
}
