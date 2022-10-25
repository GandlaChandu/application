//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';
import { FormListActionType, PermissionActionType } from '../../../../shared';

import { UserMapManagerState } from './user-map-manager.state';
import { UserMapManagerActionType } from './user-map-manager-action-type.enum';

//#endregion application imports

const initialUserMapManagerState: UserMapManagerState = {};

/**
 * loader user map manager reducer
 * @param state
 * @param action
 */
export function userMapManagerReducer(state: UserMapManagerState = initialUserMapManagerState, action: IAppActionModel<UserMapManagerState>): UserMapManagerState {
    switch (action.type) {

        case UserMapManagerActionType.FetchAllUsers: {
            return {
                ...state,
                formlist: action.payload.formlist,
                total: action.payload.total ? action.payload.total : state.total
            }
        }
        case UserMapManagerActionType.FetchEntityUsers: {
            return {
                ...state,
                assignedUsers: action.payload.assignedUsers,
            }
        }
        case UserMapManagerActionType.SetLocationInfo: {
            return {
                ...state,
                locationInfo: action.payload.locationInfo,
            }
        }
       
        case UserMapManagerActionType.ShowPermissionPopup:
            return {
                ...state,
                showPermissionPopup: action.payload.showPermissionPopup
            };
        case FormListActionType.RefreshGridInfo:
            return {
                ...state,
                formlist: action.payload.formlist
            };
        case PermissionActionType.FetchPermissionNodes:
            return {
                ...state,
                permissionNodes: action.payload.permissionNodes
            };

        case PermissionActionType.SetPermissionNodes:
            return {
                ...state,
                permissionNodes: action.payload.permissionNodes
            };
        case PermissionActionType.SetSelectedRoles:
            return {
                ...state,
                userRoleInfo: action.payload.userRoleInfo
            };
        case PermissionActionType.SetSaveDisabledState:
            return {
                ...state,
                isSaveDisabled: action.payload.isSaveDisabled
            };
        default:
            return state;
    }
}


