using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models
{
    public class GitHubMetaDataModel : BaseTicketSystemModel
    {
        public GitHubMetaDataModel(TicketSystemType ticketSystemType)
        {
            Type = ticketSystemType;
        }

        public List<ListItem<string>> Assignees { get; set; }
        public List<ListItem<string>> Labels { get; set; }
        public List<ListItem<int>> MileStones { get; set; }
        public List<ListItem<int>> States { get; set; }
    }
}
