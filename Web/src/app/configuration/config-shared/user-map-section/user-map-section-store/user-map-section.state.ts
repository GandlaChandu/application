//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult, FormListState, PageState, PermissionState } from '../../../../shared';
import { CoreState } from '../../../../core';

import { UserMapSectionModel, UserLocationInfoModel } from '../models';

//#endregion application imports

export interface UserMapSectionState extends FormListState<UserMapSectionModel>, PageState, CoreState, PermissionState {

    //#region model properties

    assignedUsers?: PagedResult<UserMapSectionModel>;
    showUserTab?: boolean;
    locationInfo?: UserLocationInfoModel;
    showPermissionPopup?: boolean;

    //#endregion  model properties

}