//#region react imports
//#endregion react imports

//#region application imports

import { CoreActionType } from '../action-types';
import { CoreState } from '../core-states';
import { Dispatch } from 'react';
import { ActionHelper } from '../helpers';
import { IAppActionModel, ErrorInfoModel } from '../models';
import { GlobalState } from '../../shared';

//#endregion application imports

export class CoreActionCreator {

    //#region public functions

    /**
     * action to remove error state info to store
     */
    public static clearErrorAction() {
        return ActionHelper.createAction<CoreState>(CoreActionType.RemoveError, { errorInfo: new ErrorInfoModel() });
    }

    /**
     * action to set error state info to store
     * @param errorModel
     */
    public static setErrorAction(errorModel: ErrorInfoModel) {
        return ActionHelper.createAction<CoreState>(CoreActionType.SetError, { errorInfo: errorModel });
    }

    /**
     * action to show loader state info to store
     * @param show
     */
    public static showLoaderAction(show: boolean = false) {
        let queueCount = show ? 1 : -1;
        return (dispatch: Dispatch<IAppActionModel<CoreState>>, getState: () => GlobalState) => {
            let stateQueueCount = getState().coreState.loaderInfo ? getState().coreState.loaderInfo.queueCount : 0;
            dispatch({
                type: CoreActionType.ShowLoader,
                payload: {
                    loaderInfo: {
                        showLoader: show,
                        queueCount: stateQueueCount + queueCount
                    }
                }
            });
        };
    }

    /**
     * action to set SSO token info to store
     * @param isAuthenticated
     */
    public static setAuthenticatedUser(isAuthenticated: boolean = false) {
        return (dispatch: Dispatch<IAppActionModel<CoreState>>) => {
            dispatch({
                type: CoreActionType.SetAuthStatus,
                payload: {
                    autheticationInfo: { isAutheticated: isAuthenticated }
                }
            });
        };
    }

    /**
     * action to set redirection state to store
     * @param isSSORedirected
     */
    public static setSSORedirectState(isSSORedirected: boolean = false) {
        return (dispatch: Dispatch<IAppActionModel<CoreState>>) => {
            dispatch({
                type: CoreActionType.SetSSORedirectState,
                payload: {
                    isSSORedirect: isSSORedirected
                }
            });
        };
    }

    //#endregion public functions
}
