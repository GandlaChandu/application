using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService.ApiClients;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

using System.Threading.Tasks;

using static Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Constant;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Service.ApiClients
{
    public class ApplicationAnalyzerClient : IApplicationAnalyzerClient
    {
        private readonly IHttpService _httpService;
        private readonly IHttpHeaderService _httpHeaderService;

        public ApplicationAnalyzerClient(
            IHttpServiceFactory httpServiceFactory,
            IHttpHeaderService httpHeaderService)
        {
            _httpService = httpServiceFactory.CreateHttpService(ApplicationAnalyzerHttpClient);
            _httpHeaderService = httpHeaderService;
        }

        public async Task<ProjectDTO> GetProjectByIdAsync(int id)
        {
            if (id <= 0)
            {
                return null;
            }

            var headers = _httpHeaderService.ReadAuthHeader();

            var response = await _httpService.GetAsync($"{ApplicationAnalyzerConstants.GetProjectById}{id}", headers);

            if (response.IsSuccess)
            {
                return JsonUtility.DeserializeObject<ProjectDTO>(response.Response);
            }

            return null;
        }
    }
}
