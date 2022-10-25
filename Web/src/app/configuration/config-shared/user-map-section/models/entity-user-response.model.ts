//#region react imports
//#endregion react imports

//#region application imports

import { EntityType, Role } from '../../../../utilities';

import { UserMapSectionModel } from './user-map-section.model';

//#endregion application imports

export interface EntityUserResponseModel {
    id?: number;
    user: UserMapSectionModel;
    entityType: EntityType;
    entityId: number;
    roleId: Role;
    role: Role;
}