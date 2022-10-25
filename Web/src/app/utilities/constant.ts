export class Constant {

    public static readonly pageTitle = class {
        public static readonly homePage: string = 'Home';

        public static readonly manageDashboardPage: string = 'Dashboard';
        public static readonly recentScan: string = 'Recent Scans';
        public static readonly manageProjectDashboardPage: string = 'Project Dashboard';

        public static readonly manageClientPage: string = 'Manage Clients';
        public static readonly addClientPage: string = 'Add Client';
        public static readonly editClientPage: string = 'Edit Client';

        public static readonly addDivisionPage: string = 'Add Division';
        public static readonly editDivisionPage: string = 'Edit Division';

        public static readonly manageProjectPage: string = 'Manage Projects';
        public static readonly addProjectPage: string = 'Add Project';
        public static readonly editProjectPage: string = 'Edit Project';

        public static readonly addQualityProfilePage: string = 'Add Quality Profile';
        public static readonly editQualityProfilePage: string = 'Edit Quality Profile';

        public static readonly dynamicScanListPage: string = 'Dynamic Scans';
        public static readonly dynamicScanReportPage: string = 'Dynamic Scan Results';
        public static readonly dynamicScanTriggerPage: string = 'Trigger Dynamic Scan';

        public static readonly staticScanListPage: string = 'Static Scans';
        public static readonly staticScanReportPage: string = 'Static Scan Results';
        public static readonly staticScanTriggerPage: string = 'Trigger Static Scan';

        public static readonly staticScanRuleConfigListPage: string = 'Static Scan Rule Config';
        public static readonly statiScanEditQualityProfilePage: string = 'Edit Quality Profile';
        public static readonly staticScanAddQualityProfilePage: string = 'Add Quality Profile';
        public static readonly staticScanImportRulePage: string = 'Import Rules';

        public static readonly dynamicScanRuleConfigListPage: string = 'Dynamic Scan Rule Config';
        public static readonly addDynamicScanRule = 'Add Dynamic Scan Policy';
        public static readonly editDynamicScanRule = 'Edit Dynamic Scan Policy';
        public static readonly dynamicScannerPage = 'Dynamic Scanner';

        public static readonly raiseIssue: string = 'Raise Issue';
        public static readonly updateIssue: string = 'Update Issue';

        public static readonly manageUserPage: string = 'Manage Users';
        public static readonly addUserPage: string = 'Add User';
        public static readonly editUserPage: string = 'Edit User';
        public static readonly manageUserMapsPage: string = 'Manage User Maps';

        public static readonly manageSchedulePage: string = 'Manage Schedules';
        public static readonly addSchedulePage: string = 'Add Schedule';
        public static readonly editSchedulePage: string = 'Edit Schedule';

    }

    public static readonly message = class {
        public static readonly requiredMessage: string = 'is required';
        public static readonly minLenMessage: string = 'does not meet minimum limit of';
        public static readonly maxLenMessage: string = 'exceeds maximum limit of';
        public static readonly patternMessage: string = 'is invalid';

        public static readonly apiErrorMessage: string = 'An error occurred while processing request';
        public static readonly apiSuccessMessage: string = 'Saved Successfully';
        public static readonly apiUpdateSuccessMessage: string = 'Updated Successfully';
        public static readonly apiGetErrorMessage: string = 'Fail to get details';
    }

    public static readonly reducerKey = class {
        public static readonly navReducer: string = 'navState';

        public static readonly dashboardReducer: string = 'dashboardManager';
        public static readonly dashboardProjectReducer: string = 'dashboardProjectManager';

        public static readonly clientManagerReducer: string = 'clientManager';
        public static readonly clientReducer: string = 'client';

        public static readonly projectManagerReducer: string = 'projectManager';
        public static readonly projectReducer: string = 'project';
        public static readonly projectStaticScanReducer: string = 'projectStaticScan';

        public static readonly dynamicScanListReducer: string = 'dynamicScanListReducer';
        public static readonly dynamicScanReportReducer: string = 'dynamicScanReportReducer';
        public static readonly dynamicScanTriggerReducer: string = 'dynamicScanTriggerReducer';

        public static readonly staticScanListReducer: string = 'staticScanListReducer';
        public static readonly staticScanReportReducer: string = 'staticScanReportReducer';
        public static readonly staticScanTriggerReducer: string = 'staticScanTriggerReducer';

        public static readonly dynamicScanRuleManagerReducer: string = 'dynamicScanRuleManagerReducer';
        public static readonly dynamicScanPolicyReducer: string = 'dynamicScanPolicyReducer';
        public static readonly dynamicPolicyCategoryReducer: string = 'policyCategoryScanner';

        public static readonly staticProfileManagerReducer: string = 'staticScanQualityProfileReducer';
        public static readonly staticProfileConfigReducer: string = 'staticScanQualityProfileConfigReducer';
        public static readonly importRulesReducer: string = 'importrules';

        public static readonly ticketingIssueReducer: string = 'TicketingIssue';

        public static readonly userManagerReducer: string = 'userManager';
        public static readonly userReducer: string = 'user';
        public static readonly userMapManagerReducer: string = 'userMapManager';

        public static readonly scheduleManagerReducer: string = 'scheduleManager';
        public static readonly scheduleReducer: string = 'schedule';

    }

    public static readonly text = class {
        public static readonly yesText: string = 'Yes';
        public static readonly noText: string = 'No';
        public static readonly dot: string = '.';
        public static readonly na: string = 'N/A';
    }

    public static readonly grid = class {
        public static readonly actionTypeField: string = 'actionType';
        public static readonly rowDataField: string = 'rowData';
    }

    public static readonly header = class {
        public static readonly id: string = 'Project-Id';
        public static readonly authToken: string = 'Authorization';
        public static readonly accept: string = 'Accept';
        public static readonly contentDisposition: string = 'Content-Disposition';
        public static readonly contentType: string = 'Content-Type';
    }

    public static readonly ssoParams = class {
        public static readonly returnUrl: string = 'returnUrl';
        public static readonly redirectURL: string = 'redirectURL';
        public static readonly accessToken: string = 'access_token';
    }

    public static readonly format = class {
        public static readonly dateFormat: string = 'DD-MMM-YYYY';
        public static readonly dateTimeFormat: string = 'DD-MM-YYYY HH:mm:ss';
    }

    public static readonly file = class {
        public static readonly excelMime: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        public static readonly excelExt: string = '.xlsx';
        public static readonly pdfExt: string = '.pdf';
        public static readonly pdfMime: string = 'application/pdf';

        public static readonly contentDisposition: string = 'attachment; filename=';
        public static readonly staticReportFileName: string = `${process.env.REACT_APP_STATIC_SCAN_REPORT_FILENAME}`;
        public static readonly dynamicReportFileName: string = `${process.env.REACT_APP_DYNAMIC_SCAN_REPORT_FILENAME}`;

    }

    public static readonly defaultCron: string = '0 0 0 ? * * *';

}
