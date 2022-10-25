using System;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums
{
    [Obsolete("Use of ReliabilityLevel has been deprecated from 2.4.0 in favour of using ConfidenceLevel.")]
    public enum ReliabilityLevel
    {
        Suspicious = 0,
        Warning = 1
    }
}
