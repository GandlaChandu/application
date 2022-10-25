//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel, PagedResult, GridRowModel, ParentNodeModel, PermissionRoleModel } from '../../../../shared';
import { TicketSystemType } from '../../../../utilities';

import { ProjectFormModel } from '../project-form/models';
import { StaticScanInfoFormModel } from '../static-scan-info';
import { DynamicScanInfoFormModel } from '../dynamic-scan-info';
import { TicketingSystemInfoFormModel } from '../ticketing-system-info';
import { UserMapSectionState, UserMapSectionModel, QualityProfileFormModel, QualityProfileSectionState } from '../../../config-shared';

//#endregion application imports

//TODO: remove static scan info state extension and properties applicable
export class ProjectState implements UserMapSectionState, QualityProfileSectionState {

    //#region model properties

    public clients?: SelectListItemModel[];

    public showDivisionControl?: boolean;
    public divisions?: SelectListItemModel[];

    public ticketingSystemTypes?: SelectListItemModel[];

    public showAppAnalysisDiv?: boolean;

    public selectedTicketingSystemType?: TicketSystemType;
    public isEnterpriseAccount?: boolean;
    public isTokenBased?: boolean;

    public projectInfo?: ProjectFormModel;
    public ticketSystemConfigInfo?: TicketingSystemInfoFormModel;
    public codeAnalysisInfo?: StaticScanInfoFormModel;
    public appAnalysisInfo?: DynamicScanInfoFormModel;
    public scanPolicies?: SelectListItemModel[];
    public showTicketForm?: boolean;
    public showTab?: string;
    public showDynamicForm?: boolean;
    public ScanPolicyMapping?: DynamicScanInfoFormModel;
    public dynamicIsTokenBased?: boolean;

    //user map

    public showUserTab?: boolean;
    public assignedUsers?: PagedResult<UserMapSectionModel>;
    public showAllUserSection?: boolean;
    public formlist?: GridRowModel<UserMapSectionModel>[];
    public roleOptions?: SelectListItemModel[];
    public permissionNodes?: ParentNodeModel[];
    public userRoleInfo?: PermissionRoleModel;
    public showPermissionPopup?: boolean;
    public isSaveDisabled?: boolean;

    //static scan

    public codeScanTypes?: SelectListItemModel[];
    public sourceCodeTypes?: SelectListItemModel[];
    public sourceControlTypes?: SelectListItemModel[];
    public showCodeAnalysisDiv?: boolean;
    public staticIsTokenBased?: boolean;

    //Quality profile
    public showQualityProfileTab?: boolean;
    public selectedProfile?: QualityProfileFormModel;
    public showPopup?: boolean;
    public languages?: SelectListItemModel[];
    public languageProfiles?: SelectListItemModel[];
    public gridResultData?: PagedResult<QualityProfileFormModel>;
    public showForm?: boolean;
    public initialProfile?: QualityProfileFormModel;

    //#endregion  model properties

    //#region constructor

    constructor() {
        this.clients = [];
        this.showDivisionControl = false;
        this.divisions = [];
        this.ticketingSystemTypes = [];
        this.scanPolicies = [];

        this.assignedUsers = new PagedResult<UserMapSectionModel>();
        this.formlist = [];
        this.roleOptions = [];
        this.permissionNodes = [];

        this.codeScanTypes = [];
        this.sourceCodeTypes = [];
        this.sourceControlTypes = [];
        this.gridResultData = new PagedResult<QualityProfileFormModel>();

    }

    //#endregion constructor

}