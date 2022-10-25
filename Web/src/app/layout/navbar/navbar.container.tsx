//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';
import { GlobalState, injectReducer, containerHelper } from '../../shared';
import { Constant } from '../../utilities';

import { NavbarActionCreator } from './navbar.action';
import { navBarReducer } from './navbar.reducer';
import { MenuItemModel } from './models/menu-item.model';
import { navBarSelector } from './navbar.selector';
import { NavbarComponent } from './navbar.component';
import { NavbarState } from './navbar.state';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownprops: any): any {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            menus: (state: GlobalState) => navBarSelector.getMenus(state),
            activeMenu: (state: GlobalState) => navBarSelector.getActiveMenu(state),
        });
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<NavbarState, any, IAppActionModel<NavbarState>>): any {
    return {

        ...containerHelper().mapDispatchToPropsBase(dispatch),

        fetchMenus: (userRole: number, path: string) =>
            dispatch(NavbarActionCreator.fetchMenuAction(userRole, path)),

        setActiveMenu: (activeMenu: MenuItemModel, menus: MenuItemModel[]) =>
            dispatch(NavbarActionCreator.setMenuActive(activeMenu, menus)),

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
export const NavbarContainer = injectReducer<any>(Constant.reducerKey.navReducer, navBarReducer)(withConnect);
