//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { GlobalState } from '../../shared';
import { Constant } from '../../utilities';
import { NavbarState } from './navbar.state';

//#endregion application imports


class NabBarSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * fetch menu items selector
     * @param state
     */
    public getMenus(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => (state[Constant.reducerKey.navReducer] ?
                (state[Constant.reducerKey.navReducer] as NavbarState).menus : []),
            (menus) => menus
        );
        return selector(state);
    }

    /**
     * fetch acive menu items
     * @param state
     */
    public getActiveMenu(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => (state[Constant.reducerKey.navReducer] ?
                (state[Constant.reducerKey.navReducer] as NavbarState).activeMenu || {} : {}),
            (activeMenu) => activeMenu
        );
        return selector(state);
    }

    /**
     * gets user profile info
     * @param state
     */
    public getLoggedInUserInfo(state: any) {
        let selector = createSelector(
            (state: GlobalState) => (state[Constant.reducerKey.navReducer] ?
                (state[Constant.reducerKey.navReducer] as NavbarState).userProfile : []),
            (userProfile) => userProfile
        );
        return selector(state);
    }

    //#endregion public functions

}

export const navBarSelector = new NabBarSelector();

