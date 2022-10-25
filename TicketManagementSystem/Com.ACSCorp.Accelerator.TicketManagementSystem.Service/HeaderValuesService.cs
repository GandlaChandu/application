using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Service
{
    public class HeaderValuesService : IHeaderValuesService
    {
        public int ProjectId { get; private set; }
        public TicketSystemConfigurationDTO TicketSystemConfiguration { get; private set; }

        public void SetHeaderInfo(int projectId,TicketSystemConfigurationDTO ticketSystemConfiguration)
        {
            ProjectId = projectId;
            TicketSystemConfiguration = ticketSystemConfiguration;
        }
    }
}
