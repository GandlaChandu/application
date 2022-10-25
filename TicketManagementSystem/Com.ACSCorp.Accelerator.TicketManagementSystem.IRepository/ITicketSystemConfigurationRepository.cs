using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.IRepository
{
    public interface ITicketSystemConfigurationRepository
    {
        //public Task<List<TicketSystemConfigurationDTO>> GetAllActiveAsync();

        //public Task<TicketSystemConfigurationDTO> GetByIdAsync(int id);

        public Task<TicketSystemConfigurationDTO> GetByProjectIdAsync(int projectId);

        public Task<int> AddTicketSystemConfiguration(TicketSystemConfigurationDTO ticketSystemConfigurationDTO);

        public Task<int> UpdateTicketSystemConfiguration(TicketSystemConfigurationDTO ticketSystemConfigurationDTO);

        public Task<bool> DeleteTicketSystemConfiguration(int id);
        public Task<TicketSystemConfigurationDTO> GetByIdAsync(int id);
    }
}
