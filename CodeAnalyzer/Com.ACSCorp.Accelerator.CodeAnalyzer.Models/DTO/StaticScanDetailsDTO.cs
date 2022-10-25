using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.Core.Models.DTO;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class StaticScanDetailsDTO : BaseDTO
    {
        public int ProjectId { get; set; }
        public string CodeOrCodeURL { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsTokenBased { get; set; }
        public SourceCodeType SourceCodeType { get; set; }
        public SourceControlType SourceControlType { get; set; }
        public List<StaticScanTypeDTO> StaticScanPreferences { get; set; }
    }
}
