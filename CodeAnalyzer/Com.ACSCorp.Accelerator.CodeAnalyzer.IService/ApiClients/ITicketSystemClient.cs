using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO.Issue;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients
{
    public interface ITicketSystemClient
    {
        public Task<Result<List<IssueStatusDTO>>> GetIssuesStatus(int projectId, IssuesStatusRequestDTO issuesStatusRequest);
    }
}
