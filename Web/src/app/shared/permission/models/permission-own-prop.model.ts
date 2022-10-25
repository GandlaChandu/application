//#region react imports
//#endregion react imports

//#region application imports

import { ParentNodeModel } from './parent-node.model';
import { PermissionState } from '../permission-store/permission.state';
import { PermissionRoleModel } from './permission-role.model';
import { UserRoleModel } from '../../models';

//#endregion application imports

export class PermissionOwnPropModel implements PermissionState {
    public permissionNodes?: ParentNodeModel[];
    public userRoleInfo?: PermissionRoleModel;
    public isSaveDisabled?: boolean;

    public form?: string;
    public namespace?: string;
    public handleSave?: (rolesArr: UserRoleModel[]) => void;

}