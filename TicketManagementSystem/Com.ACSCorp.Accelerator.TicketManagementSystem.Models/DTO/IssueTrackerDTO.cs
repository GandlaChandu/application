using Com.ACSCorp.Accelerator.Core.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO
{
    public class IssueTrackerDTO : BaseDTO
    {
        public int ScanId { get; set; }
        public ScanType ScanType { get; set; }
        public string ScanIssueId { get; set; }
        public string TicketSystemIssueId { get; set; }
        public TicketSystemType TicketSystemType { get; set; }
        public string Status { get; set; }
    }
}
