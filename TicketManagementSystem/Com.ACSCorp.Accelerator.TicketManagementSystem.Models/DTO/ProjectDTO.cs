using System;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO
{
    public class ProjectDTO
    {
        public int Id { get; set; }
        public Guid Key { get; set; }
        public int? ClientId { get; set; }
        public string ClientName { get; set; }
        public string DivisionName { get; set; }
        public string Name { get; set; }
        public int DivisionId { get; set; }
    }
}
