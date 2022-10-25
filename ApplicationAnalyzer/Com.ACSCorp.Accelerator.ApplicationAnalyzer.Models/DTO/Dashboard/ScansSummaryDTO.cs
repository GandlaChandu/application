namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO
{
    public class ScansSummaryDTO
    {
        public int ScansQueued { get; set; }
        public int ScansCompleted { get; set; }
        public int ScansScheduled { get; set; }
        public int TotalClients { get; set; }
        public int TotalProjects { get; set; }
        public int TotalDynamicScans { get; set; }
        public int TotalStaticScans { get; set; }
    }
}
