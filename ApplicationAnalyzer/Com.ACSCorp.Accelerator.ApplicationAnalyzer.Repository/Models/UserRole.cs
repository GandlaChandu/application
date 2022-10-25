using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class UserRole
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public short EntityTypeId { get; set; }
        public int EntityId { get; set; }
        public short RoleId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public virtual User User { get; set; }
    }
}
