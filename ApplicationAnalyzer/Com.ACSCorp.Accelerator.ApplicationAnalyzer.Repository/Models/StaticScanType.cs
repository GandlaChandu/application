using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class StaticScanType
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
    }
}
