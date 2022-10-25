//#region react imports
//#endregion react imports

//#region application imports

import { ParentNodeModel } from './parent-node.model';
import { PermissionRoleModel } from './permission-role.model';

//#endregion application imports

export class PermissionDispatchPropModel {
    public dispatchFetchPermissions?: () => void;
    public dispatchRefreshNodes?: (newNodes: ParentNodeModel[]) => void;
    public dispatchSetRoles?: (userRoleInfo: PermissionRoleModel) => void;
    public dispatchSetSaveDisabled?: (isDisabled: boolean) => void;
}