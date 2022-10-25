//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';
import { ColType } from '../../../utilities';

//#endregion application imports

export class UserManagerConstant {

    public static readonly headers = class {
        public static readonly firstName: GridHeaderPropModel = {
            title: 'First Name',
            dataPropertyName: 'firstName',
            canSort: true,
            canFilter: true,
            type: ColType.String
        };
        public static readonly lastName: GridHeaderPropModel = {
            title: 'Last Name',
            dataPropertyName: 'lastName',
            canSort: true,
            canFilter: true,
            type: ColType.String
        };
        public static readonly email: GridHeaderPropModel = {
            title: 'Email',
            dataPropertyName: 'email',
            canSort: true,
            canFilter: true,
            type: ColType.String
        };
        public static readonly isActive: GridHeaderPropModel = {
            title: 'Is Active',
            dataPropertyName: 'isDeleted',
            canSort: true,
            canFilter: true,
            type: ColType.Boolean
        };
       
    }
}