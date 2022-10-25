//#region react imports

//#endregion react imports

//#region application imports

import { CoreState } from '../core-states';
import { IAppActionModel } from '../models';
import { CoreActionType } from '../action-types';

//#endregion application imports

const initialCoreState: CoreState = new CoreState();

/**
 * error actions reducer
 * @param state
 * @param action
 */
export function coreReducer(state: CoreState = initialCoreState, action: IAppActionModel<CoreState>): CoreState {
    switch (action.type) {
        case CoreActionType.SetError:
            return {
                ...state,
                errorInfo: action.payload.errorInfo
            };
        case CoreActionType.RemoveError:
            return {
                ...state,
                errorInfo: action.payload.errorInfo
            };
        case CoreActionType.ShowLoader:
            return {
                ...state,
                loaderInfo: action.payload.loaderInfo
            };
        case CoreActionType.SetAuthStatus:
            return {
                ...state,
                autheticationInfo: action.payload.autheticationInfo
            };
        case CoreActionType.SetSSORedirectState:
            return {
                ...state,
                isSSORedirect: action.payload.isSSORedirect
            };
        case CoreActionType.FetchUserInfo:
            return {
                ...state,
                userProfile: action.payload.userProfile
            };
        default:
            return state;
    }
}


