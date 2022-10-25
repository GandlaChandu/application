using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.Core.Models;

using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models
{
    public class DashboardRequest
    {
        public int ClientId { get; set; }
        public int DivisionId { get; set; }
        public int ProjectId { get; set; }
        public ScanType? ScanType { get; set; }
        public int ScanId { get; set; }
        public int VulnerabilityTrendPeriod { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ListParameter ListParameter { get; set; }
        public List<int> AccessibleClients { get; set; }
    }
}
