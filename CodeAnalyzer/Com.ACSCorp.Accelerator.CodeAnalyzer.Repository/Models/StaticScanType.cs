using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models
{
    public partial class StaticScanType
    {
        public int Id { get; set; }
        public int StaticScanDetailsId { get; set; }
        public short StaticScanTypeId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public virtual StaticScanDetails StaticScanDetails { get; set; }
    }
}
