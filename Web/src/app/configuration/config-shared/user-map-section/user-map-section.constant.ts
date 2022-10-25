//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel, FormGridHeaderPropModel, FieldType } from '../../../shared';
import { Constant } from '../../../utilities';

//#endregion application imports

export class UserMapSectionConstant {

    public static readonly form: string = 'userMapManagerForm';

    public static readonly headers = class {
        public static readonly firstName: GridHeaderPropModel = {
            title: 'First Name',
            dataPropertyName: 'firstName',
            canSort: true,
        };
        public static readonly lastName: GridHeaderPropModel = {
            title: 'Last Name',
            dataPropertyName: 'lastName',
            canSort: true,
        };
        public static readonly email: GridHeaderPropModel = {
            title: 'Email',
            dataPropertyName: 'email',
            canSort: true,
        };
        public static readonly role: FormGridHeaderPropModel = {
            title: 'role',
            canSort: true,
            dataPropertyName: 'roleName',
            editModeDataPropertyName: 'roleId',
            editFieldType: FieldType.Dropdown
        };
    }

    public static readonly assignBtn: string = 'Assign';
    public static readonly unassignBtn: string = 'UnAssign';
    public static readonly editPermissionBtn: string = 'Edit Permissions';

    public static readonly errorMessage = class {
        public static readonly roleRequired: string = `Role ${Constant.message.requiredMessage}`;
    }

}