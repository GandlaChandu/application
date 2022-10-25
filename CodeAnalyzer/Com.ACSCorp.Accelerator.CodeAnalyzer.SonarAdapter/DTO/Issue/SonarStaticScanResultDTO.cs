using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO
{
    public class SonarStaticScanResultDTO
    {
        public int Total { get; set; }
        public List<SonarIssueDTO> Issues { get; set; }
        public List<SonarRuleDTO> Rules { get; set; }
        public List<Facet> Facets { get; set; }
    }

    public class Facet
    {
        public string Property { get; set; }
        public List<FacetValue> Values { get; set; }
    }

    public class FacetValue
    {
        public string Val { get; set; }
        public int Count { get; set; }
    }
}
