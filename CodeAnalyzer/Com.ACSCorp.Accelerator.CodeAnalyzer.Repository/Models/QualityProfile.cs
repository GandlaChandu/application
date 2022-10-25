using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models
{
    public partial class QualityProfile
    {
        public QualityProfile()
        {
            QualityProfilePreferences = new HashSet<QualityProfilePreferences>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public short LanguageId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string Key { get; set; }
        public int? ClientId { get; set; }

        public virtual Language Language { get; set; }
        public virtual ICollection<QualityProfilePreferences> QualityProfilePreferences { get; set; }
    }
}
