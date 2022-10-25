//#region react imports
//#endregion react imports

//#region application imports

import { ClientModel, SelectListItemModel, PagedResult, DivisionModel, GridRowModel } from '../../../../shared';

import { DivisionSectionState } from '../division-section';
import { QualityProfileSectionState, QualityProfileFormModel } from '../../../config-shared';
import { UserMapSectionState, UserMapSectionModel } from '../../../config-shared/user-map-section';

//#endregion application imports

export class ClientState implements DivisionSectionState, QualityProfileSectionState, UserMapSectionState {

    //#region model properties

    public client?: ClientModel;
    public scanPolicies?: SelectListItemModel[];

    //division
    public showDivisionTab?: boolean;
    public divisions?: PagedResult<DivisionModel>;
    public showDivisionPopup?: boolean;
    public selectedDivision?: DivisionModel;

    //Quality profile
    public showQualityProfileTab?: boolean;
    public selectedProfile?: QualityProfileFormModel;
    public showPopup?: boolean;
    public languages?: SelectListItemModel[];
    public languageProfiles?: SelectListItemModel[];
    public gridResultData?: PagedResult<QualityProfileFormModel>;
    public initialProfile?: QualityProfileFormModel;

    //user map

    public showUserTab?: boolean;
    public assignedUsers?: PagedResult<UserMapSectionModel>;
    public showAllUserSection?: boolean;
    public formlist?: GridRowModel<UserMapSectionModel>[];

    //#endregion  model properties

    //#region constructor

    constructor() {
        this.scanPolicies = [];

        this.divisions = new PagedResult<DivisionModel>();
        this.languages = [];
        this.gridResultData = new PagedResult<QualityProfileFormModel>();
        this.assignedUsers = new PagedResult<UserMapSectionModel>();
        this.formlist = [];
    }

    //#endregion constructor

    //#region private methods
    //#endregion private methods

}