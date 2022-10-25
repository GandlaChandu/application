//#region react imports
//#endregion react imports

//#region application imports

import { EntityType } from '../../../../utilities';
import { UserRoleModel } from '../../../../shared';

//#endregion application imports

export class UserMapSectionModel {

    public id: number;
    public userId: number;
    public firstName: number;
    public lastName: string;
    public email: string;
    public isActive: boolean;
    public isDeleted: boolean;

    public roleName: string;
    public roleId: number;
    public entityType: EntityType;
    public entityId: number;

    public userRoles?: UserRoleModel[];
}