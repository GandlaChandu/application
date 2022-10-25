//#region react imports

//#endregion react imports

//#region application imports

import { NavbarState } from './navbar.state';
import { IAppActionModel } from '../../core';
import { NavbarActionType } from './navbar-action-type.enum';

//#endregion application imports

const initialNavState: NavbarState = new NavbarState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function navBarReducer(state: NavbarState = initialNavState, action: IAppActionModel<NavbarState>): NavbarState {
    switch (action.type) {
        case NavbarActionType.FetchMenus:
            return {
                menus: action.payload.menus
            };
        case NavbarActionType.SetMenuActive:
            return {
                menus: action.payload.menus,
                activeMenu: action.payload.activeMenu
            };
        default:
            return state;
    }
}


