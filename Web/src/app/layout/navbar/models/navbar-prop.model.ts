//#region react imports
//#endregion react imports

//#region application imports

import { NavbarState } from '../navbar.state';
import { MenuItemModel } from './menu-item.model';

//#endregion application imports

export interface NavbarPropModel extends NavbarState {
    history?: any;
    fetchMenus?: (userRole: number, path?: string) => void;
    setActiveMenu?: (activeMenu: MenuItemModel, menus: MenuItemModel[]) => void;
} 