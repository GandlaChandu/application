using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.IRepository
{
    public interface IIssueTrackerRepository : IBaseRepository
    {
        /// <summary>
        /// Add Issue 
        /// </summary>
        /// <param name="issueDTO"></param>
        /// <returns></returns>
        public Task<int> AddIssueInfoAsync(IssueTrackerDTO issueDTO);

        /// <summary>
        /// Update issue
        /// </summary>
        /// <param name="issueDTO"></param>
        /// <returns></returns>
        public Task<int> UpdateIssueInfoAsync(IssueTrackerDTO issueDTO);

        /// <summary>
        /// Get issue tracker information.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<IssueTrackerDTO> GetIssueTrackerAsync(int id);

        /// <summary>
        /// Get issues
        /// </summary>
        /// <param name="issuesResultRequest"></param>
        /// <returns></returns>
        public List<IssueTrackerDTO> GetIssueTrackersAsync(IssuesResultRequestDTO issuesResultRequest);
    }
}
