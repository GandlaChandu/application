using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.IService.ApiClients
{
    public interface IApplicationAnalyzerClient
    {
        public Task<ProjectDTO> GetProjectByIdAsync(int id);
    }
}
