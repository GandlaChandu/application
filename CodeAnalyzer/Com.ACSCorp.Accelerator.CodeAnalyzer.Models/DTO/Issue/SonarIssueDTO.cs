using Com.ACSCorp.Accelerator.CodeAnalyzer.Models.DTO;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class SonarIssueDTO
    {
        public string Key { get; set; }

        public string Rule { get; set; }

        public string Severity { get; set; }

        public string Component { get; set; }

        public string Project { get; set; }

        public int Line { get; set; }

        public string Hash { get; set; }

        public string Status { get; set; }

        public string Message { get; set; }

        public string CreationDate { get; set; }

        public string UpdateDate { get; set; }

        public string Type { get; set; }

        public int CweId { get; set; }
        public string Organization { get; set; }

        public IssueStatusDTO TicketSystemStatus { get; set; }
    }
}
