using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models
{
    public partial class EntityType
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
    }
}
