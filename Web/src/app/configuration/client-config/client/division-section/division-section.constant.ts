//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../../shared';

//#endregion application imports

export class DivisionSectionConstant {

    public static readonly headers = class {
        public static readonly divisionName: GridHeaderPropModel = {
            title: 'Division Name',
            dataPropertyName: 'name',
            canSort: true,
        };
        public static readonly isActive: GridHeaderPropModel = {
            title: 'Is Active',
            dataPropertyName:'isDeleted',
            canSort: true,
        };
       
    }
}