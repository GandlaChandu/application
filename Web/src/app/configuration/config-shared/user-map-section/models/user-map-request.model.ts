//#region react imports
//#endregion react imports

//#region application imports

import { EntityType, Role } from '../../../../utilities';

//#endregion application imports

export interface UserMapRequestModel {
  
    id?: number;
    entityType: EntityType;
    entityId: number;
    roleId: Role;
    userId: number;

    isDeleted?: boolean;

}