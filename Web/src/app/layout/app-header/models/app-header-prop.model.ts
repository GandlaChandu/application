//#region react imports

import { History } from 'history';

//#endregion react imports

//#region application imports

import { UserProfileModel } from '../../../shared';

//#endregion application imports

export class AppHeaderPropModel {
    public isGlobalError: boolean;
    public showMenu: boolean;
    public toggleMenu?: (_: boolean) => any;
    public history?: History;
    public showUserIconDropdown?: boolean;
    public toggleIconDropdown?: (_: boolean) => any;
    public loggedInUserInfo?: UserProfileModel;
    public dispatchClearError?: () => void;

}