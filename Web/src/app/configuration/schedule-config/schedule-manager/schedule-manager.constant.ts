//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';
import { ColType } from '../../../utilities';

//#endregion application imports

export class ScheduleManagerConstant {

    public static readonly headers = class {
        public static readonly title: GridHeaderPropModel = {
            title: 'Name',
            dataPropertyName: 'name',
            canSort: true,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly client: GridHeaderPropModel = {
            title: 'Client',
            dataPropertyName: 'client',
            canSort: true,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly division: GridHeaderPropModel = {
            title: 'Division',
            dataPropertyName: 'division',
            canSort: true,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly project: GridHeaderPropModel = {
            title: 'Project',
            dataPropertyName: 'project',
            canSort: true,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly scanType: GridHeaderPropModel = {
            title: 'Scan Type',
            dataPropertyName: 'scanType',
            canSort: true,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly isActive: GridHeaderPropModel = {
            title: 'Is Active',
            dataPropertyName: 'isEnabled',
            canSort: true,
            //canFilter: true,
            type: ColType.Boolean
        };
       
    }
}