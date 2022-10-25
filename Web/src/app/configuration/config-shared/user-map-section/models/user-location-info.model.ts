//#region react imports
//#endregion react imports

//#region application imports

import { EntityType, Role } from '../../../../utilities';
import { SelectListItemModel } from '../../../../shared';

//#endregion application imports

export interface UserLocationInfoModel {
    entityType?: EntityType;
    entityId?: number;
    entityName?: string;
    entityInfo?: any;
    prevPageUrl?: string;
    defaultRole?: Role;
    roleOptions?: SelectListItemModel[];
}