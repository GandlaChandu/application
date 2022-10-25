namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common
{
    public class UriConstants
    {
        public struct CodeAnalyzerEndpoints
        {
            public const string GetStaticScans = "StaticScan/GetAll";
            public const string GetProjectStaticScanUrlList = "StaticScan/GetProjectStaticScanUrlList";
            public const string StaticScanPost = "StaticScan/PostSilent/";
            public const string CreateProject = "Sonar/CreateProject/";
        }

        public struct SecurityAnalyzerEndpoints
        {
            public const string GetDynamicScans = "DynamicScan/GetAll";
            public const string GetProjectDynamicScanUrlList = "DynamicScan/GetProjectDynamicScanUrlList/";
            public const string DynamicScanPost = "DynamicScan/PostSilent/";
        }

        public struct QueueApiEndpoints
        {
            public const string GetPendingQueueCount = "QueueAPI/Get";
        }
    }
}
