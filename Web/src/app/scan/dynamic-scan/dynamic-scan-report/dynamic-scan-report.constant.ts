//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';
import { ColType } from '../../../utilities';

//#endregion application imports

export class DynamicScanReportConstant {

    public static readonly headers = class {
        public static readonly url: GridHeaderPropModel = {
            title: 'Url',
            dataPropertyName: 'url',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly vulnerability: GridHeaderPropModel = {
            title: 'Vulnerability',
            dataPropertyName: 'alertMessage',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly risk: GridHeaderPropModel = {
            title: 'Risk',
            dataPropertyName: 'riskLevel',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly confidence: GridHeaderPropModel = {
            title: 'Confidence',
            dataPropertyName: 'confidenceLevel',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly description: GridHeaderPropModel = {
            title: 'Description',
            dataPropertyName: 'description',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly solution: GridHeaderPropModel = {
            title: 'Solution',
            dataPropertyName: 'solution',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
        public static readonly reference: GridHeaderPropModel = {
            title: 'Reference',
            dataPropertyName: 'reference',
            canSort: false,
        };
        public static readonly issueStatus: GridHeaderPropModel = {
            title: 'Issue',
            dataPropertyName: 'issueStatus',
            canSort: false,
            //canFilter: true,
            type: ColType.String
        };
    }
}