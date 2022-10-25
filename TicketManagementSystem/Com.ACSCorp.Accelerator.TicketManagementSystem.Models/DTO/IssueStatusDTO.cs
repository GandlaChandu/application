using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO
{
    public class IssueStatusDTO
    {
        public int Id { get; set; }
        public string ScanIssueId { get; set; }
        public string Status { get; set; }
        public TicketSystemType TicketSystemType { get; set; }
    }
}
