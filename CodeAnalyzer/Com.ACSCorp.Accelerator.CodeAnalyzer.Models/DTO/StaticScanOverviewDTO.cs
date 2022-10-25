namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{ 
    public class StaticScanOverviewDTO
    {
        public decimal Coverage { get; set; }
        public int CyclomaticComplexicity { get; set; }
        public int DuplicatedLines { get; set; }
        public decimal DuplicatedLinesPercentage { get; set; }
        public int Tests { get; set; }
        public decimal TestSuccessPercentage { get; set; }
    }
}
