using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.OWASPAdapter
{
    public class ApiResponse
    {
        public string Scan { get; set; }
        public int Status { get; set; }
        public string Result { get; set; }
        public List<string> Results { get; set; }
    }
}
