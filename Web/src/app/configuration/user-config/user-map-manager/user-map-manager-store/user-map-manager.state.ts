//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult, GridRowModel, PermissionState } from '../../../../shared';

import { UserMapSectionModel, UserLocationInfoModel, UserMapSectionState } from '../../../config-shared';

//#endregion application imports

export interface UserMapManagerState extends UserMapSectionState, PermissionState {

    //#region model properties

    assignedUsers?: PagedResult<UserMapSectionModel>;
    locationInfo?: UserLocationInfoModel;
    formlist?: GridRowModel<UserMapSectionModel>[];
    showPermissionPopup?: boolean;

    //#endregion  model properties

}