//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';

//#endregion application imports

export class QualityProfileManagerConstant {

    public static readonly headers = class {
        public static readonly profileName: GridHeaderPropModel = {
            title: 'Name',
            dataPropertyName: 'name',
            canSort: true
        };
        public static readonly languageName: GridHeaderPropModel = {
            title: 'Language',
            dataPropertyName: 'languageName'
        };
    }
}