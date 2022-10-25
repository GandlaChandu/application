using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models
{
    public partial class StaticScanResult
    {
        public int Id { get; set; }
        public int StaticScanId { get; set; }
        public string Key { get; set; }
        public string Severity { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public string RuleKey { get; set; }
        public string RuleName { get; set; }
        public string RuleLanguage { get; set; }
        public string Component { get; set; }
        public int? LineNumber { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public virtual StaticScan StaticScan { get; set; }
    }
}
