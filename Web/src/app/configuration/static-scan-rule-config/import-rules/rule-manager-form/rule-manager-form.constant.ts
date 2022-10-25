//#region react imports
//#endregion react imports

//#region application imports

import { FormGridHeaderPropModel, FieldType } from '../../../../shared';

//#endregion application imports

export class RuleManagerFormConstant {

    public static readonly form: string = 'importRuleManagerForm';

    public static readonly headers = class {
        public static readonly ruleName: FormGridHeaderPropModel = {
            title: 'Rule Name',
            dataPropertyName: 'name',
        };
        public static readonly status: FormGridHeaderPropModel = {
            title: 'Status',
            dataPropertyName: 'status',
        };
        public static readonly isActive: FormGridHeaderPropModel = {
            title: 'Is Active',
            dataPropertyName: 'isActive',
            isEditable: () => true,
            editModeDataPropertyName: 'isActive',
            editFieldType: FieldType.Switch,
            
        };
    }
}