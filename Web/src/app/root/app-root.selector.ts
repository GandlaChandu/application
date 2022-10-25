//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { GlobalState } from '../shared';

//#endregion application imports


class AppRootSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets page title
     * @param state
     */
    public getPageTitle(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.pageState && state.pageState.pageTitle) ? state.pageState.pageTitle : ''),
            (showMenu) => showMenu
        );
        return selector(state);
    }

    /**
     * gets page title
     * @param state
     */
    public getAuthenticatedUser(state: any) {
        let selector = createSelector(
            (state: any) => (state.coreState.autheticationInfo.isAutheticated),
            (isAutheticated) => isAutheticated
        );
        return selector(state);
    }

    /**
     * gets redirect state
     * @param state
     */
    public getSSORedirectState(state: any) {
        let selector = createSelector(
            (state: any) => (state.coreState.isSSORedirect),
            (isSSORedirect) => isSSORedirect
        );
        return selector(state);
    }

    //#endregion public functions

}

export const appRootSelector = new AppRootSelector();

