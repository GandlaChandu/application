using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class CweInfoGroupModel : CweInfoDTO
    {
        public List<SonarIssueDTO> Issues { get; set; }
    }
}
