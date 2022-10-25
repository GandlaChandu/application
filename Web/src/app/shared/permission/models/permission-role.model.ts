//#region react imports
//#endregion react imports

//#region application imports

import { UserRoleModel } from '../../models';

//#endregion application imports

export class PermissionRoleModel {
    public userInfo: UserRoleModel;
    public roles: number[];

    constructor() {
        this.roles = [];
    }
}