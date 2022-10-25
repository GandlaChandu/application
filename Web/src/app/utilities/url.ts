export class Url {

    public static readonly pageUrl = class {
        public static readonly errorPage: string = '/error';
        public static readonly loginPage: string = '/login';

        public static readonly manageDashboardPage: string = '/dashboard';
        public static readonly manageProjectDashboardPage: string = '/project-dashboard';

        public static readonly landingPage: string = '/dashboard';
        public static readonly emptyPath: string = '/';
        public static readonly projectListPage: string = '/project-list';
        public static readonly registerProjectPage: string = '/register-project';

        public static readonly manageClientPage: string = '/manage-client';
        public static readonly addEditCientPage: string = '/add-edit-client';

        public static readonly dynamicScanListPage: string = '/dynamic-scans';
        public static readonly dynamicScanTriggerPage: string = '/dynamic-scan-trigger';
        public static readonly dynamicScanResultsPage: string = '/dynamic-scan-results';

        public static readonly staticScanListPage: string = '/static-scans';
        public static readonly staticScanTriggerPage: string = '/static-scan-trigger';
        public static readonly staticScanResultsPage: string = '/static-scan-results';

        public static readonly dynamicScanRuleConfigPage: string = '/dynamic-scan-rule-config';
        public static readonly addEditDynamicScanRule: string = '/addedit-dynamic-scan-rule';
        public static readonly dynamicScanPolicyScanner: string = '/dynamic-scan-rule-scanner';

        public static readonly staticScanRuleConfigPage: string = '/static-scan-rule-config';
        public static readonly addEditStaticScanRule: string = '/static-scan-rule-profile';
        public static readonly ImportStaticScanRulePage: string = '/import-rules';

        public static readonly manageUserPage: string = '/manage-user';
        public static readonly addEditUserPage: string = '/add-edit-user';
        public static readonly manageUserMapsPage: string = '/manage-user-maps';

        public static readonly manageSchedulePage: string = '/manage-schedule';
        public static readonly addEditSchedulePage: string = '/add-edit-schedule';

    }

    public static readonly apiUrl = class {

        public static readonly menuFetchApi: string = '';

        public static readonly getVulnerabilitiesBySeverityApi: string = 'VulnerabilityStatistics/GetVulnerabilitiesBySeverity​';
        public static readonly getRecentScansApi: string = 'VulnerabilityStatistics/GetRecentScanList';
        public static readonly getLastScannedOnApi: string = 'VulnerabilityStatistics/GetLastScannedOn​';
        public static readonly getScanSummaryApi: string = 'VulnerabilityStatistics/GetScansSummary​';
        public static readonly getMyProjectsApi: string = 'VulnerabilityStatistics/GetMyProjects​';

        public static readonly getTopVulnerabilityTypesApi: string = 'VulnerabilityStatistics/GetVulnerabilitiesByType​';
        public static readonly getVulnerabilityTrendApi: string = 'VulnerabilityStatistics/GetVulnerabilityTrend​';

        public static readonly clientUpdateApi: string = 'Client/Put';
        public static readonly clientSaveApi: string = 'Client/Post';
        public static readonly clientListApi: string = 'Client/GetAll';
        public static readonly activeClientListApi: string = 'Client/GetAllActive';

        public static readonly divisionSaveApi: string = 'Division/Post';
        public static readonly divisionUpdateApi: string = 'Division/Put';
        public static readonly divisionListApi: string = 'Division/GetAll';
        public static readonly activeDivisionListApi: string = 'Division/GetAllActive';

        public static readonly getActiveProjectsByDivisionIdApi: string = 'Project/GetProjectsByDivisionAndType/';
        public static readonly projectListApi: string = 'Project/GetAll';
        public static readonly getScanTypesApi: string = 'Project/GetScanTypes';
        public static readonly getStaticScanTypesApi: string = 'Project/GetStaticScanTypes';
        public static readonly getStaticSourceCodeTypesApi: string = 'Project/GetSourceCodeTypes';
        public static readonly getStaticSourceControlTypesApi: string = 'Project/GetSourceControlTypes';
        public static readonly getTicketSystemTypesApi: string = 'Project/GetTicketSystemType';
        public static readonly saveProjectApi: string = 'Project/Post';
        public static readonly updateProjectApi: string = 'Project/Put';
        public static readonly getProject: string = 'Project/Get';

        public static readonly getCodeAnalysis: string = 'StaticScan/GetStaticScanDetailsByProjectId';
        public static readonly saveCodeAnalysisApi: string = 'StaticScan/SaveStaticScanDetails';
        public static readonly updateCodeAnalysisApi: string = 'StaticScan/UpdateStaticScanDetails';
        public static readonly removeCodeMappingAPI: string = 'StaticScan/DeleteStaticScanDetailsById';

        public static readonly getAppAnalysis: string = 'DynamicScan/GetDynamicScanDetails';
        public static readonly saveAppAnalysisApi: string = 'DynamicScan/SaveDynamicScanDetails';
        public static readonly updateAppAnalysisApi: string = 'DynamicScan/UpdateDynamicScanDetails';
        public static readonly removeAppMappingAPI: string = 'DynamicScan/DeleteDynamicScanDetailsById';
        public static readonly getTicketSystemConfigApi: string = 'TicketSystemConfiguration/GetById';
        public static readonly saveTicketSystemConfigApi: string = 'TicketSystemConfiguration/Create';
        public static readonly updateTicketSystemConfigApi: string = 'TicketSystemConfiguration/Update';
        public static readonly removeTicketMappingAPI: string = 'TicketSystemConfiguration/Delete';

        public static readonly getProjectScanPolicyAPI: string = 'ScanPolicy/GetScanPoliciesByEntityId';
        public static readonly saveProjectScanPolicyAPI: string = 'ScanPolicy/SaveScanPolicyMapping';
        public static readonly updateProjectScanPolicyAPI: string = 'ScanPolicy/UpdateScanPolicyMapping';
        public static readonly removeScanPolicyMappingAPI: string = 'ScanPolicy/DeleteScanPolicyMapping';

        public static readonly dynamicScanListApi: string = 'DynamicScan/GetAll';
        public static readonly triggerDynamicScanApi: string = 'DynamicScan/Post/';
        public static readonly dynamicScanResultsFetchApi: string = 'DynamicScanResult/GetDynamicScanResults?scanId=';
        public static readonly dynamicScanReportByFormatApi: string = 'DynamicScanReport/DownloadReport';

        public static readonly dynamicFetchScanPoliciesApi: string = 'ScanPolicy/GetScanPolicies';
        public static readonly dynamicSaveScanPolicyApi: string = 'ScanPolicy/CreateScanPolicy';
        public static readonly dynamicUpdateScanPolicyApi: string = 'ScanPolicy/UpdateScanPolicy';
        public static readonly dynamicFetchScanPolicyNamesApi: string = 'ScanPolicy/GetScanPolicyNames';
        public static readonly dynamicSaveScanPolicyMappingApi: string = 'ScanPolicy/SaveScanPolicyMapping';
        public static readonly dynamicUpdateScanPolicyMappingApi: string = 'ScanPolicy/UpdateScanPolicyMapping';
        public static readonly dynamicFetchScanPolicisByEntity: string = 'ScanPolicy/GetScanPoliciesByEntityId';
        public static readonly dynamicFetchStrengthsApi: string = 'ScanPolicy/GetScanPolicyStrengthTypes';
        public static readonly dynamicFetchThresholdsApi: string = 'ScanPolicy/GetScanPolicyThresholdTypes';
        public static readonly dynamicFetcScanPolicyById: string = 'ScanPolicy/GetScanPolicyById/';

        public static readonly dynamicFetchCategoriesApi: string = 'ScanPolicyConfig/GetCategoriesByScanPolicyCode';
        public static readonly dynamicFetchScannersApi: string = 'ScanPolicyConfig/GetScannersByCategoryId/';
        public static readonly dynamicCategoryUpdateStrengthApi: string = 'ScanPolicyConfig/UpdateCategoryStrength/';
        public static readonly dynamicCategoryUpdateThresholdApi: string = 'ScanPolicyConfig/UpdateCategoryThreshold/';
        public static readonly dynamicScannerUpdateThresholdApi: string = 'ScanPolicyConfig/UpdateScannerThreshold/';
        public static readonly dynamicScannerUpdateStrengthApi: string = 'ScanPolicyConfig/UpdateScannerStrength/';

        public static readonly staticScanListApi: string = 'StaticScan/GetAll';
        public static readonly triggerStaticScanApi: string = 'StaticScan/Post/';
        public static readonly staticScanResultsFetchApi: string = 'StaticScanResult/GetStaticScanResults';
        public static readonly staticScanResultSummaryApi: string = 'StaticScanResult/GetStaticScanOverview/';
        public static readonly staticScanReportByFormatApi: string = 'StaticScanReport/DownloadReport';

        public static readonly staticScanRuleConfigFetchApi: string = 'QualityProfile/GetAll';
        public static readonly fetchLanguageTypesApi: string = 'Language/GetAll';
        public static readonly getQualityProfile: string = 'QualityProfile/Get';
        public static readonly fetchSeverityTypesApi: string = 'Data/GetAllSeverities';
        public static readonly fetchVulnerebilityTypesApi: string = 'Data/GetAllVulnerabilities';
        public static readonly rulesListApi: string = 'Data/GetAllRules';
        public static readonly saveProfileApi: string = 'QualityProfile/Post';
        public static readonly updateProfileApi: string = 'QualityProfile/Put';
        public static readonly profileBasedRulesListApi: string = 'QualityProfile/GetQualityProfileRules';
        public static readonly saveRuleActivationApi: string = 'QualityProfile/ChangeRuleActivation';

        public static readonly fetchEntityProfilesApi: string = 'QualityProfilePreferences/Get';
        public static readonly fetchLanguageApi: string = 'Language/GetAll';
        public static readonly fetchLanguageQualityProfilesApi: string = 'QualityProfile/GetQualityProfilesByLanguageId/';
        public static readonly qualityProfileForEntitySaveApi: string = 'QualityProfilePreferences/Post';
        public static readonly qualityProfileForEntityEditApi: string = 'QualityProfilePreferences/Put';
        public static readonly removeLanguageProfileMapping: string = 'QualityProfilePreferences/Delete/';

        public static readonly fetchIssueMetaDataApi: string = 'TicketSystem/GetIssueMetaData';
        public static readonly fetchIssueByIdApi: string = 'TicketSystem/GetIssueById/';
        public static readonly saveIssueApi: string = 'TicketSystem/CreateIssue';
        public static readonly updateIssueApi: string = 'TicketSystem/UpdateIssue';

        public static readonly fetchAllUsersApi: string = 'User/GetAll';
        public static readonly fetchUserApi: string = 'User/Get/';
        public static readonly userUpdateApi: string = 'User/Put';
        public static readonly userSaveApi: string = 'User/Post';

        public static readonly fetchEntityUsersApi: string = 'UserRole/GetAll';
        public static readonly saveEntityUserApi: string = 'UserRole/Post';
        public static readonly removeEntityUserApi: string = 'UserRole/Delete/';
        public static readonly saveEntityUserRoleApi: string = 'UserRole/SaveUserRoles';

        public static readonly fetchAllSchedulesApi: string = 'Job/GetAll';
        public static readonly fetchScheduleApi: string = 'Job/Get/';
        public static readonly scheduleUpdateApi: string = 'Job/Put';
        public static readonly scheduleSaveApi: string = 'Job/Post';
        public static readonly scheduleDeleteApi: string = 'Job/Delete';

        public static readonly SSOAcceleratorLoginApi: string = 'account/login/1009';
        public static readonly SSOAcceleratorLogoutApi: string = 'account/logout/1009';
        
        public static readonly getLoggedInUserInfoApi: string = 'me';
    }

    /**
     * gets application analyzer api url
     * @param url 
     */
    public static getApplicationAnalyzerUrl(url: string): string {
        return `${process.env.REACT_APP_APP_ANALYZER_API}${url}`;
    }

    /**
     * gets static scan api url
     * @param url 
     */
    public static getStaticScanUrl(url: string): string {
        return `${process.env.REACT_APP_STATIC_SCAN_API}${url}`;
    }

    /**
     * gets dynamic scan api url
     * @param url 
     */
    public static getDynamicScanUrl(url: string): string {
        return `${process.env.REACT_APP_DYNAMIC_SCAN_API}${url}`;
    }

    /**
     * gets ticket management system api url
     * @param url 
     */
    public static getTicketSystemUrl(url: string): string {
        return `${process.env.REACT_APP_TICKETING_SYSTEM_API}${url}`;
    }

    /**
     * gets SSO accelerator api url
     * @param url 
     */
    public static getSSOAcceleratorUrl(url: string): string {
        return `${process.env.REACT_APP_ACS_SSO_ACCELERATOR_API}${url}`;
    }
}