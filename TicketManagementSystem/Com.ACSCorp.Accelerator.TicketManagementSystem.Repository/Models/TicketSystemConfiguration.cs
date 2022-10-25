using System;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Models
{
    public partial class TicketSystemConfiguration
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public short Type { get; set; }
        public string Configuration { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
