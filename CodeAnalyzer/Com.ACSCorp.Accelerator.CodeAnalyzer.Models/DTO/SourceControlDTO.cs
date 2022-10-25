using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class SourceControlDTO
    {
        public SourceControlType SourceControlType { get; set; }
        public string ProjectKey { get; set; }
        public string Url { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
