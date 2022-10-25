//#region react imports
//#endregion react imports

//#region application imports

import { UserProfileModel } from '../../shared';

import { MenuItemModel } from './models/menu-item.model';

//#endregion application imports

export class NavbarState {
    public menus?: MenuItemModel[];
    public activeMenu?: MenuItemModel;
    public userProfile?: UserProfileModel;
}