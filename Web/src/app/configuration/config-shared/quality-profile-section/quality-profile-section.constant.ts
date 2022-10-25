//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';

//#endregion application imports

export class QualityProfileSectionConstant {

    public static readonly headers = class {
        public static readonly languageName: GridHeaderPropModel = {
            title: 'Language',
            dataPropertyName:'languageName',
            canSort: true
        };
        public static readonly qualityProfileName: GridHeaderPropModel = {
            title: 'Profile Name',
            dataPropertyName:'qualityProfileName',
            canSort: true
        };       
    }
}