//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { UserState } from './user.state';
import { UserActionType } from './user-action-type.enum';

//#endregion application imports

const initialUserState: UserState = new UserState();

/**
 * user actions reducer
 * @param state
 * @param action
 */
export function userReducer(state: UserState = initialUserState, action: IAppActionModel<UserState>): UserState {
    switch (action.type) {

        case UserActionType.SetUser:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
}


