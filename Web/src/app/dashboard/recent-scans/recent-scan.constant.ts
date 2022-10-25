//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../shared';

//#endregion application imports

export class RecentScanConstant {

    public static readonly headers = class {
        public static readonly date: GridHeaderPropModel = {
            title: 'Scan Date',
            dataPropertyName: 'scanDate',
            canSort: true,
            width: '150px'
        };
        public static readonly projectName: GridHeaderPropModel = {
            title: 'Project Name',
            dataPropertyName: 'projectName',
            canSort: true,
            width: '200px'
        };
        public static readonly url: GridHeaderPropModel = {
            title: 'Link',
            dataPropertyName: 'url',
            canSort: true,
            width: '300px'
        };
        public static readonly stats: GridHeaderPropModel = {
            title: 'Vulnerability Stats',
        };

    }
}