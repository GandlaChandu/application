namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class Policy
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Enabled { get; set; }
        public string AttackStrength { get; set; }
        public string AlertThreshold { get; set; }
    }
}
