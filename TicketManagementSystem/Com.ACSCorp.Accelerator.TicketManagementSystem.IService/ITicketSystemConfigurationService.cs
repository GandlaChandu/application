using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.IService
{
    public interface ITicketSystemConfigurationService
    {
        public Task<Result<TicketSystemConfigurationDTO>> GetTicketSystemConfigurationByProjectIdAsync(int projectId);

        //public Task<Result<TicketSystemConfigurationDTO>> GetTicketSystemConfigurationByIdAsync(int id);

        //public Task<Result<List<TicketSystemConfigurationDTO>>> GetAllTicketSystemConfigurationAsync();

        public Task<Result<int>> CreateTicketSystemConfiguration(TicketSystemConfigurationDTO ticketSystemConfigurationDTO);

        public Task<Result<int>> UpdateTicketSystemConfigurationAsync(TicketSystemConfigurationDTO ticketSystemConfigurationDTO);

        public Task<Result<bool>> DeleteTicketSystemConfigurationAsync(int id);
    }
}
