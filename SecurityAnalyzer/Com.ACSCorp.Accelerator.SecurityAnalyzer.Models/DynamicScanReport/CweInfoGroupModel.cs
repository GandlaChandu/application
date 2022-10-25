using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models
{
    public class CweInfoGroupModel : CweInfoDTO
    {
        public List<DynamicScanResultDTO> Issues { get; set; }
    }
}
