namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common
{
    public static class Constant
    {
        public const string UrlRegex = @"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)";
        public const string EmailRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";

        public const int DefaultVulnerabilityTrendPeriod = 30;

        public struct SeverityConstants
        {
            public const string BLOCKER = "BLOCKER";
            public const string CRITICAL = "CRITICAL";
            public const string MAJOR = "MAJOR";
            public const string MINOR = "MINOR";
            public const string INFORMATIONAL = "Informational";
            public const string HIGH = "High";
            public const string MEDIUM = "Medium";
            public const string LOW = "Low";
        }
    }
}
