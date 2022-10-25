//#region react imports
//#endregion react imports

//#region application imports

import {
    ErrorFn,
    SuccessFn,
    PageBaseDispatchPropModel,
    GridRowModel,
    PermissionRoleModel,
    UserRoleRequestModel
} from '../../../../shared';

import {
    UserMapPageRequestModel,
    UserLocationInfoModel,
    UserMapSectionModel,
    UserMapRequestModel
} from '../../../config-shared';

//#endregion application imports

export interface UserMapManagerDispatchPropModel extends PageBaseDispatchPropModel {
    dispacthFetchAllUsers?: (pageRequest: UserMapPageRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispatchSetLocationInfo?: (locationInfo: UserLocationInfoModel) => void;
    dispatchRefresh?: (rowData: GridRowModel<UserMapSectionModel>, allUsers: GridRowModel<UserMapSectionModel>[], assignedUsers: UserMapSectionModel[]) => void;
    dispatchSaveUser?: (request: UserMapRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispatchRemoveUser?: (id: number, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispatchShowPopup?: (show: boolean) => void;
    dispatchFetchPermissions?: () => void;
    dispatchSelectedRoles?: (userRoleInfo: PermissionRoleModel) => void;
    dispatchSaveUserRoles?: (roles: UserRoleRequestModel[], successCallback: SuccessFn, errorCallback: ErrorFn) => void;
}