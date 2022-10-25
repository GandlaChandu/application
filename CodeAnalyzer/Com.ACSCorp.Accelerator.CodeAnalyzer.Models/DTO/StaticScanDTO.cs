using Com.ACSCorp.Accelerator.Core.Models.DTO;

using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class StaticScanDTO : BaseDTO
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int ProjectStaticScanDetailsId { get; set; }
        public string SonarQubeAnalysisTaskId { get; set; }
        public string Url { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int RunById { get; set; }
        public string Status { get; set; }
        public short? StatusId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
