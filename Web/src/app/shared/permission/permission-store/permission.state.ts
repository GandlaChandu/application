//#region react imports
//#endregion react imports

//#region application imports

import { ParentNodeModel } from '../models/parent-node.model';
import { PermissionRoleModel } from '../models/permission-role.model';

//#endregion application imports

export interface PermissionState {
    permissionNodes?: ParentNodeModel[];
    userRoleInfo?: PermissionRoleModel;
    isSaveDisabled?: boolean;
}