//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { GlobalState } from '../../shared';
import { ToasterInfoModel, AlertInfoModel, UserRoleModel } from '../models';

//#endregion application imports


class PageSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets global error condition
     * @param state
     */
    public getGlobalErrorState(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.coreState && state.coreState.errorInfo) ? (state.coreState.errorInfo.isGlobalError || false) : false),
            (isGlobalError) => isGlobalError
        );
        return selector(state);
    }

    /**
     * gets menu display info
     * @param state
     */
    public getMenuDisplayState(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.pageState && state.pageState.showMenu) ? true : false),
            (showMenu) => showMenu
        );
        return selector(state);
    }

    /**
     * gets toaster info
     * @param state
     */
    public getToasterState(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => state.pageState ? state.pageState.toasterInfo : new ToasterInfoModel(),
            (toaster) => toaster
        );
        return selector(state);
    }

    /**
     * gets alert info
     * @param state
     */
    public getAlertState(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => state.pageState ? state.pageState.alertInfo : new AlertInfoModel(),
            (toaster) => toaster
        );
        return selector(state);
    }

    /**
     * gets edit mode info
     * @param state
     */
    public getEditModeState(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.pageState && state.pageState.isEditMode) ? true : false),
            (isEditMode) => isEditMode
        );
        return selector(state);
    }

    /**
     * gets submit button state info
     * @param state
     */
    public getSubmitButtonState(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.pageState && state.pageState.isSaveAndContinue) ? true : false),
            (isSaveAndContinue) => isSaveAndContinue
        );
        return selector(state);
    }

    /**
     * gets dropdown display info
     * @param state
     */
    public getDropdownDisplayState(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.pageState && state.pageState.showUserIconDropdown) ? true : false),
            (showUserIconDropdown) => showUserIconDropdown
        );
        return selector(state);
    }

    /**
     * gets page loading info
     * @param state
     */
    public getPageLoadingInfo(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.pageState) ? state.pageState.isLoading : false),
            (isLoading) => isLoading
        );
        return selector(state);
    }

    /**
     * gets user profile info
     * @param state
     */
    public getUserProfile(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.coreState) ? state.coreState.userProfile : null),
            (userProfile) => userProfile
        );
        return selector(state);
    }

    /**
     * gets user role info
     * @param state
     */
    public getUserRoles(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => {
                if (state.coreState &&
                    state.coreState.userProfile &&
                    state.coreState.userProfile.role) {
                    let roles: UserRoleModel[] = [
                        {
                            roleId: state.coreState.userProfile.role
                        }
                    ];
                    if (state.coreState.userProfile.userRoles &&
                        state.coreState.userProfile.userRoles.length > 0) {
                        roles.concat(state.coreState.userProfile.userRoles);
                    }
                    return roles;
                }
                return [];
            },
            (roles) => roles
        );
        return selector(state);
    }

    /**
     * gets authentication info
     * @param state
     */
    public getAuthInfo(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => ((state.coreState) ? state.coreState.autheticationInfo : null),
            (autheticationInfo) => autheticationInfo
        );
        return selector(state);
    }

    //#endregion public functions

}

export const pageSelector = new PageSelector();

