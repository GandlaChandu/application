using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Models
{
    [Table("IssueTracker")]
    public partial class IssueTrackerEntity
    {
        public int Id { get; set; }
        public int ScanId { get; set; }
        public short ScanType { get; set; }
        public string ScanIssueId { get; set; }
        public string TicketSystemIssueId { get; set; }
        public short TicketSystemType { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
