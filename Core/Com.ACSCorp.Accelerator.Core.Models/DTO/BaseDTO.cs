using System;

namespace Com.ACSCorp.Accelerator.Core.Models.DTO
{
    public class BaseDTO
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
