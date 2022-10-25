using Com.ACSCorp.Accelerator.Core.Models;
using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO
{
    public class RecentScanDTO
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string Url { get; set; }
        public List<ListItem<int>> Vulnerabilities { get; set; }
        public DateTime ScanDate { get; set; }
        public short ScanTypeId { get; set; }
        public int ScanId { get; set; }
    }
}
