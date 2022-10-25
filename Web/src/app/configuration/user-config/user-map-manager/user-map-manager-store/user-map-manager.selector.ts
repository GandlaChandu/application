//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { UserMapManagerOwnPropModel } from '../models/user-map-manager-own-prop.model';
import { UserMapManagerState } from './user-map-manager.state';

//#endregion application imports


class UserMapManagerSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions
    
    /**
     * gets location info state
     * @param state
     * @param ownProps
     */
    public getlocationInfoState(state: any, ownProps: UserMapManagerOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as UserMapManagerState).locationInfo : {},
            (locationInfo) => locationInfo
        );
        return selector(state);
    }

    /**
     * gets permission popup display info state
     * @param state
     * @param ownProps
     */
    public getPopupState(state: any, ownProps: UserMapManagerOwnPropModel) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as UserMapManagerState).showPermissionPopup : false,
            (showPermissionPopup) => showPermissionPopup
        );
        return selector(state);
    }

    //#endregion public functions

}

export const userMapManagerSelector = new UserMapManagerSelector();

