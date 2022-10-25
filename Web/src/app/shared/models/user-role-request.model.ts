//#region react imports
//#endregion react imports

//#region application imports

import { UserRoleModel } from './user-role.model';

//#endregion application imports

export class UserRoleRequestModel extends UserRoleModel {
    public id?: number;
    public userId?: number;
    public isDeleted?: boolean;
}