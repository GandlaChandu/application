using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.IService
{
    public interface ITicketSystemService
    {
        /// <summary>
        /// Get Issue by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<Result<TicketSystemIssueModel>> GetIssueByIdAsync(int id);

        /// <summary>
        /// create Git hub issue.
        /// </summary>
        /// <param name="issueRequest"></param>
        /// <returns></returns>
        public Task<Result<int>> CreateIssueAsync(TicketSystemIssueModel issueRequest);

        /// <summary>
        /// Update issue
        /// </summary>
        /// <param name="issueRequest"></param>
        /// <returns></returns>
        public Task<Result<int>> UpdateIssueAsync(UpdateTicketSystemIssueModel issueRequest);

        /// <summary>
        /// get issue tracker information
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<Result<IssueTrackerDTO>> GetIssueTrackerAsync(int id);

        /// <summary>
        /// get ticket system metada
        /// </summary>
        /// <returns></returns>
        public Task<Result<BaseTicketSystemModel>> GetIssueMetaData();

        /// <summary>
        /// Get issues statuses
        /// </summary>
        /// <param name="issueResultsRequest"></param>
        /// <returns></returns>
        public Task<Result<IEnumerable<IssueStatusDTO>>> GetIssuesResult(IssuesResultRequestDTO issueResultsRequest);
    }
}
