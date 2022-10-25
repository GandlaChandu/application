namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Common
{
    public static class Messages
    {
        public const string QualityProfileNotFound = "Quality Profile does not exists";
        public const string QualityProfileWithIdNotFound = "Quality profile with Id:{0} does not exists";
        public const string LanguageIdIsInvalidForQualityProfile = "invalid language Id:{0} with respect to quality profile with Id:{1}";
        public const string QualityProfileExistWithGivenName = "Quality profile already exists for the language with given name";

        public const string StaticScanDetailNotFound = "Static scan details not found.";
        public const string StaticScanResultsNotFound = "Failed to get the static scan results for scanId : ";
        public const string StaticScanDetailsSaveFailed = "Static scan details saving failed";
        public const string StaticScanDetailsUpdateFailed = "Static scan details update failed";
        public const string FailedToGetStaticScanDetails = "Failed to get Static scan details";

        public const string ProjectDetailNotFound = "Project details not found.";
        public const string ProjectNotConfiguredForStaticScan = "Project is not configured for static scan";
        public const string ProjectNotConfiguredForCodeCoverage = "Project is not configured for Code Coverage";
        public const string UnableToCloneRepository = "Unable to Clone Repository, Please provide valid Inputs.";
        public const string FailedToInitiateScan = "Failed to initiate scan.";
        public const string UnableToFindProject = "Unable to find Project information.";
        public const string UnableToFindScanDetails = "Unable to find Scan details.";
        public const string ProjectStaticScanDetailsNotFound = "Project static Scan details not found.";

        public const string SonarCallBackForTaskId = "sonar callback for taskId: {0}";
        public const string InvalidProjectId = "Invalid project Id";
        public const string FailedToCreateQualityProfile = "Failed To Create Quality Profile.";
        public const string FailedToSaveQualityProfile = "Failed To Save Quality Profile.";
        public const string InvalidEntityType = "Invalid entity type.";
        public const string InvalidEntityId = "Invalid entity Id.";
        public const string InvalidLanguageId = "Invalid language Id.";
        public const string EntityIdNotFound = "EntityId:{0} not found.";
        public const string InvalidQualityProfileId = "Invalid Quality profile Id.";
        public const string InvalidQualityProfile = "Invalid Quality profile.";
        public const string QualityProfileisAlreadyMapped = "Quality Profile is already set.";
        public const string QualityProfilePrefernceAlreadyExistForGivenLanguage = "Quality Profile preference already exist for the given language.";
        public const string FailedToRemovePreviousQualityProfile = "Failed to remove previous quality profile.";
        public const string FailedToSaveQualityProfilePreferences = "Failed to Save Quality profile preferences.";
        public const string FoundMultipleQalityProfilePreference = "Found multiple Quality profile preferences for same language with entityType:{0}, entityId:{1} languageId:{2}";
        public const string QualityProfilePrefernceNotFound = "Quality profile preference not found with id:{0}";
        public const string QualityProfilePrefernceLanguageChangeIsNotAllowed = "LanguageChange is not allowed.";
        public const string QualityProfilePrefernceCanNotBeAssociated = "Quality profile Id {0} is for language {1} and can not be associated with language {2}";
        public const string QualityProfilePreferncesNotFound = "Quality profile preferences are not found for entityType:{0}, entityId:{1}";
        public const string FailedToRemoveQualityProfilePrefernces = "Failed to remove quality profile preferences for entityType:{0}, entityId:{1}";

        public const string FailedToFetchIssuesStatuses = "Failed to fetch issue statuses.";

        public const string VulnerablityStatisticsCalculationStarted = "Vulnerablity statistics calculation started for static scan";
        public const string VulnerablityStatisticsCalculationEnded = "Vulnerablity statistics calculation completed for static scan";
        public const string SonarQubeGetFailed = "Failed to get issues from SonarQube";
        public const string VulnerablityStatisticsSaveFailed = "Failed to save vulnerablity statistics";

        public const string UnAuthorizedEntityAccess = "User is not allowed to perform this operation due to insufficient access permission";

        public const string UserNotFound = "User details not found";
        public const string AttachmentFail = "Error occured while fetching attachments";
        public const string EmailBodyFail = "Error occured while fetching email body";
        public const string EmailSendFail = "Error occured while sending email";
        public const string EmailSentSuccess = "Static scan email report sent to user";
    }
}
