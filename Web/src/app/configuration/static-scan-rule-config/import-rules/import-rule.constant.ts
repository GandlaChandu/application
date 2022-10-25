//#region react imports
//#endregion react imports

//#region application imports

import { GridHeaderPropModel } from '../../../shared';

//#endregion application imports

export class ImportRuleConstant {

    public static readonly headers = class {
        public static readonly RuleName: GridHeaderPropModel = {
            title: 'Rule Name',
            dataPropertyName:'name'
        };
       
    }
}