using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.ModelBinder;

using Microsoft.AspNetCore.Mvc;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models
{
    [ModelBinder(typeof(TicketSystemIssueRequestModelBinder<UpdateTicketSystemIssueModel>))]
    public class UpdateTicketSystemIssueModel : BaseTicketSystemIssueModel
    {
    }
}
