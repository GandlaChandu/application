//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { UserProfileModel, GlobalState } from '../../shared';

//#endregion application imports


class AppHeaderSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets user profile info
     * @param state
     */
    public getLoggedInUserInfo(state: any) {
        let selector = createSelector(
            (state: GlobalState) => state.coreState ? state.coreState.userProfile : new UserProfileModel(),
            (userProfile) => userProfile
        );
        return selector(state);
    }

    //#endregion public functions

}

export const appHeaderSelector = new AppHeaderSelector();

