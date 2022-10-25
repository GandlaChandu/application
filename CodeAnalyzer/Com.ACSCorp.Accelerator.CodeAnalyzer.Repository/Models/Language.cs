using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models
{
    public partial class Language
    {
        public Language()
        {
            QualityProfile = new HashSet<QualityProfile>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<QualityProfile> QualityProfile { get; set; }
    }
}
