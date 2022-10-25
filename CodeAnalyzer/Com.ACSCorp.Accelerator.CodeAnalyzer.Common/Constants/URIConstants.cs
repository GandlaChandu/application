namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants
{
    public static class UriConstants
    {
        public struct ApplicationAnalyzerEndpoints
        {
            public const string GetClientById = "Client/Get/";

            public const string GetProjectById = "Project/Get/";
            public const string GetProjectNamesByIds = "Project/GetNamesByIds";

            public const string SaveVulnerabilityStatistics = "VulnerabilityStatistics/Post";
            public const string GetUserById = "User/Get/";

            public const string GetCweInfoByIds = "Cwe/GetAll";
        }

        public struct TicketSystemEndpoints
        {
            public const string GetIssuesStatus = "TicketSystem/GetIssuesStatus";
        }

        public struct QueueApiEndpoints
        {
            public const string PostQueueAPI = "QueueAPI/Post";
        }
    }
}