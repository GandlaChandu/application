using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO
{
    public class RulesResponse
    {
        public int Total { get; set; }
        public List<SonarRuleDTO> Rules { get; set; }
    }
}
