using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models
{
    public partial class QualityProfilePreferences
    {
        public int Id { get; set; }
        public int QualityProfileId { get; set; }
        public short EntityTypeId { get; set; }
        public int EntityId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int? ModifiedById { get; set; }

        public virtual QualityProfile QualityProfile { get; set; }
    }
}
