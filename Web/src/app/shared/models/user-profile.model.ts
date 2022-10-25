//#region react imports
//#endregion react imports

//#region application imports

import { UserRoleModel } from './user-role.model';

//#endregion application imports

export class UserProfileModel {
    public firstName?: string;
    public lastName?: string;
    public emailId?: string;
    public role?: number;
    public userRoles?: UserRoleModel[]
    public id?: number;
}