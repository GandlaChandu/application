//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { UserManagerState } from './user-manager.state';
import { UserManagerActionType } from './user-manager-action-type.enum';

//#endregion application imports

const initialUserManagerState: UserManagerState = new UserManagerState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function userManagerReducer(state: UserManagerState = initialUserManagerState, action: IAppActionModel<UserManagerState>): UserManagerState {
    switch (action.type) {
        case UserManagerActionType.FetchUsers:
            return {
                ...state,
                users: action.payload.users
            };
        default:
            return state;
    }
}


