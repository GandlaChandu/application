namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Common
{
    public static class Messages
    {
        public const string DynamicScanNotFound = "Dynamic scan does not exists";
        public const string ProjectDynamicScanNotConfigured = "Project is not configured for dynamic scan";
        public const string ProjectNotFound = "Project does not exists";

        public const string CreateScanPolicyFailed = "Failed to create scan policy";
        public const string UpdateScanPolicyFailed = "Failed to update scan policy";

        public const string FailedGetPoliciesByScanPolicyCode = "Failed to get policies by scan policy code";
        public const string FailedUpdatePolicyThreshold = "Failed to update policy threshold";
        public const string FailedUpdatePolicyStrength = "Failed to update policy strength";
        public const string FailedEnablingPolicies = "Failed to enable policies";
        public const string NoScannersAvailableForPolicyId = "No scanners available for this policy id";
        public const string FailedUpdateScannerThreshold = "Failed to update scanner threshold";
        public const string FailedUpdateScannerStrenght = "Failed to update scanner strength";
        public const string FailedDeleteScanPolicy = "Failed to delete scan policy";

        public const string CreateScanPolicyMappingFailed = "Failed to create scan policy mapping";
        public const string UpdateScanPolicyMappingFailed = "Failed to map scan policy";
        public const string InvalidScanPolicyMappingDetails = "Invalid scan policy mapping details";

        public const string DynamicScanDetailsNotFound = "Dynamic scan details does not exists";
        public const string DynamicScanResultsNotFound = "Failed to get the dynamic scan results for the scanId : ";
        public const string AddDynamicScanDetailsFailMessage = "Failed to add dynamic scan details";

        public const string FailedToFetchIssuesStatuses = "Failed to fetch issue statuses.";
        public const string ScanPolicyMappingExistsForProject = "Scan policy mapping details already exist for given entity";
        public const string ScanPolicyMappingDetailsNotFound = "Scan policy mapping details not found";
        public const string ScanPolicyMappingUpdateFail = "Failed to update Scan policy mapping details";
        public const string ScanPolicyMappingDeleteFail = "Failed to delete scan policy mapping details";

        public const string VulnerablityStatisticsSaveStarted = "Vulnerablity statistics calculation started for dynamic scan";
        public const string VulnerablityStatisticsSaveEnded = "Vulnerablity statistics calculation completed for dynamic scan";
        public const string VulnerablityStatisticsSaveFailed = "Failed to save vulnerablity statistics";

        public const string UnAuthorizedEntityAccess = "User is not allowed to perform this operation due to insufficient access permission";

        public const string UserNotFound = "User details not found";
        public const string AttachmentFail = "Error occured while fetching attachments";
        public const string EmailBodyGetFail = "Error occured while fetching email body";
        public const string EmailSendFail = "Error occured while sending email";

        public const string CWEInfoNotFound = "CWE information not found for selected dynamic scan";
    }
}
