//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../shared';

//#endregion application imports

export class ProjectListSectionConstant {

    public static readonly headers = class {
       
        public static readonly projectName: GridHeaderPropModel = {
            title: 'Project Name',
            dataPropertyName: 'name',
            canSort: true,
        };
        public static readonly stats: GridHeaderPropModel = {
            title: 'Vulnerability Stats',
            dataPropertyName:'high'
        };
       
    }
}