using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.UriConstants;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service.ApiClients
{
    public class TicketSystemClient : ITicketSystemClient
    {
        #region Variables

        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        #endregion Variables

        #region Constructors

        public TicketSystemClient(IHttpServiceFactory httpServiceFactory, IHttpHeaderService httpHeaderService)
        {
            _httpService = httpServiceFactory.CreateHttpService(Constants.TicketSystemHttpClient);
            _httpHeaderService = httpHeaderService;
        }

        #endregion Constructors

        #region Public Methods

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

        #endregion Public Methods

        #region Private Methods

        private Dictionary<string, string> GetProjectIdHeader(int projectId)
        {
            return new Dictionary<string, string>()
            {
                {"Project-Id", projectId.ToString() }
            };
        }

        #endregion Private Methods
    }
}
