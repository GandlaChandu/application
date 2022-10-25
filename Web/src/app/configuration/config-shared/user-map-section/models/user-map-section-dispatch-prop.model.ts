//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, SuccessFn, ErrorFn, UserRoleRequestModel } from '../../../../shared';

import { UserMapPageRequestModel } from './user-map-page-request.model';
import { UserMapRequestModel } from './user-map-request.model';
import { PermissionRoleModel } from '../../../../shared/permission/models/permission-role.model';

//#endregion application imports

export interface UserMapSectionDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchEntityUsers?: (pageRequest: UserMapPageRequestModel, errorCallback: ErrorFn) => void;
    dispatchSaveUser?: (request: UserMapRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispatchRemoveUser?: (id: number, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispatchShowPopup?: (show: boolean) => void;
    dispatchFetchPermissions?: () => void;
    dispatchSelectedRoles?: (userRoleInfo: PermissionRoleModel) => void;
    dispatchSaveUserRoles?: (roles: UserRoleRequestModel[], successCallback: SuccessFn, errorCallback: ErrorFn) => void;
}