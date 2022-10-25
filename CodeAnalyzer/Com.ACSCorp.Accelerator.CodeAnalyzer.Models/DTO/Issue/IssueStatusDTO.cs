namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO
{
    public class IssueStatusDTO
    {
        public int Id { get; set; }
        public string ScanIssueId { get; set; }
        public string Status { get; set; }
        public int TicketSystemType { get; set; }
    }
}
