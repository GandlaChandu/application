using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models
{
    public partial class DynamicScanDetails
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Url { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
