using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models
{
    public partial class Cweinfo
    {
        public int Id { get; set; }
        public int Cweid { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Recommendation { get; set; }
        public string Category { get; set; }
    }
}
