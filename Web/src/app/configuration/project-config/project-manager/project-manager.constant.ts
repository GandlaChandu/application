//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';

//#endregion application imports

export class ProjectManagerConstant {

    public static readonly headers = class {
        public static readonly clientName: GridHeaderPropModel = {
            title: 'Client Name',
            dataPropertyName: 'clientName'
        };
        public static readonly divisionName: GridHeaderPropModel = {
            title: 'Division Name',
            dataPropertyName: 'divisionName'
        };
        public static readonly projectName: GridHeaderPropModel = {
            title: 'Project Name',
            dataPropertyName: 'name',
            canSort: true,
        };
        public static readonly isStaticScan: GridHeaderPropModel = {
            title: 'Is Static Scan',
            dataPropertyName:'staticScanDetails'
        };
        public static readonly isDynamicScan: GridHeaderPropModel = {
            title: 'Is Dynamic Scan',
            dataPropertyName:'dynamicScanDetails',
        };
        public static readonly isActive: GridHeaderPropModel = {
            title: 'Is Active',
            dataPropertyName:'isActive',
            canSort: true,
        };
    }
}