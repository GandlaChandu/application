using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models
{
    public partial class StaticScanDetails
    {
        public StaticScanDetails()
        {
            StaticScanType = new HashSet<StaticScanType>();
        }

        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Url { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public short SourceCodeType { get; set; }
        public short SourceControlType { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ProjectPath { get; set; }

        public virtual ICollection<StaticScanType> StaticScanType { get; set; }
    }
}
