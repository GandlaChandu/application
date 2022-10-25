using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.ModelBinders;
using Com.ACSCorp.Accelerator.Core.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;

using Microsoft.AspNetCore.Mvc;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO
{
    [ModelBinder(typeof(TicketSystemConfigurationBinder))]
    public class TicketSystemConfigurationDTO : BaseDTO
    {
        public int ProjectId { get; set; }
        public TicketSystemType Type { get; set; }
        public BaseTicketSystemModel Configuration { get; set; }
    }
}
