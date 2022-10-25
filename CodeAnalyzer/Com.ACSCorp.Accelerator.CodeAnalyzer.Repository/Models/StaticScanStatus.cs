using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models
{
    public partial class StaticScanStatus
    {
        public StaticScanStatus()
        {
            StaticScan = new HashSet<StaticScan>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<StaticScan> StaticScan { get; set; }
    }
}
