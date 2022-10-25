using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO.QualityProfile
{
    public class CreateQualityProfileResponseDTO
    {
        public ProfileDTO Profile { get; set; }
        public List<string> Warnings { get; set; }
    }
}
