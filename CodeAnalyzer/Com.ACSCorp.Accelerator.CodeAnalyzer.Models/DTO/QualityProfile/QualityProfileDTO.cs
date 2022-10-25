﻿using Com.ACSCorp.Accelerator.Core.Models.DTO;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Models
{
    public class QualityProfileDTO : BaseDTO
    {
        public string Name { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public string Key { get; set; }
        public short LanguageId { get; set; }
        public string LanguageName { get; set; }
        public int? ClientId { get; set; }
    }
}
