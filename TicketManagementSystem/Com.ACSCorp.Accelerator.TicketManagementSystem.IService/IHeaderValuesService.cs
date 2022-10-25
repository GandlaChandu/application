using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.IService
{
    public interface IHeaderValuesService
    {
        public int ProjectId { get; }
        public TicketSystemConfigurationDTO TicketSystemConfiguration { get; }
    }
}
