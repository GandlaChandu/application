using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO.QualityProfile
{
    public class ProjectQualityProfileDTO
    {
        public string Language { get; set; }
        public Guid ProjectKey { get; set; }
        public string QualityProfileName { get; set; }
    }
}
