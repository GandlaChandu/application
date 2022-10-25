using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients
{
    public interface ITicketSystemClient
    {
        public Task<Result<List<IssueStatusDTO>>> GetIssuesStatus(int projectId, IssuesStatusRequestDTO issuesStatusRequest);
    }
}
