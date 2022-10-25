//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, SuccessFn, ErrorFn } from '../../shared';

//#endregion application imports

export interface AppRootDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchAuthenticatedUser?: (isAuthenticated: boolean) => void;
    dispatchSSORedirectState?: (isSSORedirected: boolean) => void;
    dispatchFetchLoggedInUserInfo?: (sucessCallback: SuccessFn, errorCallback: ErrorFn) => void;
}