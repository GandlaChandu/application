using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO.Issue;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Utility;

using System.Collections.Generic;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants.UriConstants;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.ApiClients
{
    public class TicketSystemClient : ITicketSystemClient
    {
        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        public TicketSystemClient(IHttpServiceFactory httpServiceFactory, IHttpHeaderService httpHeaderService)
        {
            _httpService = httpServiceFactory.CreateHttpService(Constants.TicketSystemHttpClient);
            _httpHeaderService = httpHeaderService;
        }

        public async Task<Result<List<IssueStatusDTO>>> GetIssuesStatus(int projectId, IssuesStatusRequestDTO issuesStatusRequest)
        {
            var headers = _httpHeaderService.ReadAuthHeader();
            headers.AddRange(GetProjectIdHeader(projectId));

            var result = await _httpService.PostAsync(TicketSystemEndpoints.GetIssuesStatus, issuesStatusRequest, headers);

            if (result.IsSuccess)
            {
                return Result.Ok(JsonUtility.DeserializeObject<List<IssueStatusDTO>>(result.Response));
            }
            else
            {
                return Result.Fail<List<IssueStatusDTO>>(Messages.FailedToFetchIssuesStatuses);
            }
        }

        private Dictionary<string, string> GetProjectIdHeader(int projectId)
        {
            return new Dictionary<string, string>()
            {
                {"Project-Id", projectId.ToString() }
            };
        }
    }
}
