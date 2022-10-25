//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { PagedResult } from '../../../../shared';

import { UserMapSectionState } from './user-map-section.state';
import { UserMapSectionModel } from '../models';

//#endregion application imports


class UserMapSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets assigned users from state
     * @param state
     * @param ownProps
     */
    public getAssignedUsers(state: any, ownProps) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as UserMapSectionState).assignedUsers : new PagedResult<UserMapSectionModel>(),
            (assignedUsers) => assignedUsers
        );
        return selector(state);
    }

    /**
     * gets all users
     * @param state
     * @param ownProps
     */
    public getAllUsers(state: any, ownProps) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as UserMapSectionState).formlist :[],
            (formlist) => formlist
        );
        return selector(state);
    }

    /**
     * gets state of show/hide user tab
     * @param state
     * @param ownProps
     */
    public getUserTabState(state: any, ownProps) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as UserMapSectionState).showUserTab : false,
            (showUserTab) => showUserTab
        );
        return selector(state);
    }

    /**
     * gets permission popup display info state
     * @param state
     * @param ownProps
     */
    public getPopupState(state: any, ownProps) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as UserMapSectionState).showPermissionPopup : false,
            (showPermissionPopup) => showPermissionPopup
        );
        return selector(state);
    }
    //#endregion public functions

}

export const userMapSelector = new UserMapSelector();

