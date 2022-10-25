//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';
import { ColType } from '../../../utilities';

//#endregion application imports

export class StaticScanListConstant {

    public static readonly headers = class {
        public static readonly projectName: GridHeaderPropModel = {
            title: 'Project Name',
            dataPropertyName: 'projectName',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly url: GridHeaderPropModel = {
            title: 'Url',
            dataPropertyName: 'url',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly userName: GridHeaderPropModel = {
            title: 'Username',
            dataPropertyName: 'username',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly status: GridHeaderPropModel = {
            title: 'Status',
            dataPropertyName: 'status',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly startDate: GridHeaderPropModel = {
            title: 'Start Time',
            dataPropertyName: 'scanStartTime',
            canSort: false,
            // canFilter: true,
            type: ColType.String
        };
        public static readonly endDate: GridHeaderPropModel = {
            title: 'End Time',
            dataPropertyName: 'scanEndTime',
            canSort: false,
            // canFilter: true,
            type: ColType.String
        };
    }

    public static readonly viewTooltip: string = 'View scan results';
    public static readonly redoTooltip: string = 'Retrigger scan';

}