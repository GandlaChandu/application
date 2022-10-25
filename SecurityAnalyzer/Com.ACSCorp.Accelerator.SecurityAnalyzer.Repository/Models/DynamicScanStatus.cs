using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models
{
    public partial class DynamicScanStatus
    {
        public DynamicScanStatus()
        {
            DynamicScan = new HashSet<DynamicScan>();
        }

        public short Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<DynamicScan> DynamicScan { get; set; }
    }
}
