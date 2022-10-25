using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models
{
    public partial class DynamicScanResult
    {
        public int Id { get; set; }
        public int DynamicScanId { get; set; }
        public string AlertMessage { get; set; }
        public short? Risk { get; set; }
        public short? Confidence { get; set; }
        public string Url { get; set; }
        public string Other { get; set; }
        public string Parameter { get; set; }
        public string Attack { get; set; }
        public string Evidence { get; set; }
        public string Description { get; set; }
        public string Reference { get; set; }
        public string Solution { get; set; }
        public int? Cweid { get; set; }
        public int? Wascid { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }

        public virtual DynamicScan DynamicScan { get; set; }
    }
}
