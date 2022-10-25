//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';
import { ColType } from '../../../utilities';

//#endregion application imports

export class StaticScanReportConstant {

    public static readonly headers = class {
        public static readonly type: GridHeaderPropModel = {
            title: 'Type',
            dataPropertyName: 'type',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly vulnerability: GridHeaderPropModel = {
            title: 'Rule',
            dataPropertyName: 'rule',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly description: GridHeaderPropModel = {
            title: 'Message',
            dataPropertyName: 'message',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly risk: GridHeaderPropModel = {
            title: 'Severity',
            dataPropertyName: 'severity',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly solution: GridHeaderPropModel = {
            title: 'File',
            dataPropertyName: 'component',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly reference: GridHeaderPropModel = {
            title: 'Line #',
            dataPropertyName: 'line',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly ticketSystemStatus: GridHeaderPropModel = {
            title: 'Issue',
            dataPropertyName: 'ticketSystemStatus',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
    }
}