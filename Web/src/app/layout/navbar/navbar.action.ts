//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';

import { NavbarState } from './navbar.state';
import { navbarService } from './navbar.service';
import { NavbarActionType } from './navbar-action-type.enum';
import { MenuItemModel } from './models/menu-item.model';

//#endregion application imports

export class NavbarActionCreator {

    //#region public functions

    /**
     * action to remove error state info from store
     * @param userRole
     * @param path
     */
    public static fetchMenuAction(userRole: number, path: string) {
        return (dispatch: ThunkDispatch<NavbarState, IAppActionModel<NavbarState>, any>) => {
            navbarService.getNavItems(userRole, dispatch, path).then((resp) => {
                dispatch({
                    type: NavbarActionType.FetchMenus,
                    payload: resp
                });
            });

        };
    }

    /**
     * action to set menu active
     * @param activeMenu
     * @param menus
     */
    public static setMenuActive(activeMenu: MenuItemModel, menus: MenuItemModel[]) {
        return (dispatch: ThunkDispatch<NavbarState, any, IAppActionModel<NavbarState>>) => {
            dispatch({
                type: NavbarActionType.SetMenuActive,
                payload: { menus: menus, activeMenu: activeMenu }
            });
        };
    }

    //#endregion public functions

    //#region private functions

    //#endregion private functions
}