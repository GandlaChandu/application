//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';
import { ColType } from '../../../utilities';

//#endregion application imports

export class ClientManagerConstant {

    public static readonly headers = class {
        public static readonly clientName: GridHeaderPropModel = {
            title: 'Client Name',
            dataPropertyName: 'name',
            canSort: true,
            canFilter: true
        };
        public static readonly isActive: GridHeaderPropModel = {
            title: 'Is Active',
            dataPropertyName: 'isActive',
            canSort: true,
            canFilter: true,
            type: ColType.Boolean
        };

    }
}