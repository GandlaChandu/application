using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IRepository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Context;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Mapper;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Repository
{
    public class TicketSystemConfigurationRepository : BaseRepository<TicketSystemConfiguration>, ITicketSystemConfigurationRepository
    {
        public TicketSystemConfigurationRepository(TicketManagementDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<TicketSystemConfigurationDTO> GetByProjectIdAsync(int projectId)
        {
            TicketSystemConfiguration ticketSystemConfiguration = await GetAsync(s => s.ProjectId == projectId && s.IsDeleted == false);
            return ticketSystemConfiguration.ToDTO();
        }

        public async Task<int> AddTicketSystemConfiguration(TicketSystemConfigurationDTO ticketSystemConfigurationDTO)
        {
            TicketSystemConfiguration ticketSystemConfiguration = ticketSystemConfigurationDTO.ToEntity();
            await AddAsync(ticketSystemConfiguration);
            return ticketSystemConfiguration.Id;
        }

        public async Task<int> UpdateTicketSystemConfiguration(TicketSystemConfigurationDTO ticketSystemConfigurationDTO)
        {
            TicketSystemConfiguration ticketSystemConfiguration = ticketSystemConfigurationDTO.ToEntity();
            await UpdateAsync(ticketSystemConfiguration);
            return ticketSystemConfiguration.Id;
        }

        public async Task<bool> DeleteTicketSystemConfiguration(int id)
        {
            TicketSystemConfiguration ticketSystemConfiguration = await GetAsync(s => s.Id == id && s.IsDeleted == false);

            if (ticketSystemConfiguration == null)
            {
                return false;
            }

            ticketSystemConfiguration.IsDeleted = true;
            await UpdateAsync(ticketSystemConfiguration);
            return true;
        }

        public async Task<TicketSystemConfigurationDTO> GetByIdAsync(int id)
        {
            TicketSystemConfiguration ticketSystemConfiguration = await GetAsync(s => s.Id == id && s.IsDeleted == false);

            if (ticketSystemConfiguration != null)
                return ticketSystemConfiguration.ToDTO();
            else
                return null;
        }
    }
}
