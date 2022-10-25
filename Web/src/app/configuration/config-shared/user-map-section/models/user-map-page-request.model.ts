//#region react imports
//#endregion react imports

//#region application imports

import { EntityType, Role } from '../../../../utilities';
import { PageRequestModel } from '../../../../shared';

//#endregion application imports

export class UserMapPageRequestModel {
    public entityType: EntityType;
    public entityId: number;
    public defaultRole: Role;
    public listParameter: PageRequestModel;
    public excludeInactive: boolean;
}