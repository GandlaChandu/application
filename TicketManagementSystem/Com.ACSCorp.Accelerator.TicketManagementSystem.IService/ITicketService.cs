using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.IService
{
    public interface ITicketService
    {
        /// <summary>
        /// Get isssue by id
        /// </summary>
        /// <param name="issueId"></param>
        /// <returns></returns>
        public Task<Result<BaseTicketSystemModel>> GetIssueAsync(string issueId);

        /// <summary>
        /// Create issue
        /// </summary>
        /// <param name="ticketSystemIssueRequest"></param>
        /// <returns></returns>
        public Task<Result<int>> CreateIssueAsync(TicketSystemIssueModel ticketSystemIssueRequest);

        /// <summary>
        /// Update issue
        /// </summary>
        /// <param name="ticketSystemIssueRequest"></param>
        /// <returns></returns>
        public Task<Result<int>> UpdateIssueAsync(UpdateTicketSystemIssueModel ticketSystemIssueRequest);

        /// <summary>
        /// Get GitHub metadata
        /// </summary>
        /// <returns></returns>
        public Task<Result<BaseTicketSystemModel>> GetMetaData();

        /// <summary>
        /// Get issues status
        /// </summary>
        /// <param name="issueTrackerDTOs"></param>
        /// <returns></returns>
        public Task UpdateIssuesTrackerStatusAsync(IEnumerable<IssueTrackerDTO> issueTrackerDTOs);
    }
}
