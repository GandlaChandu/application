//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel, PageBasePropModel } from '../../../../../shared';

import { ImportRuleFormDispatchPropModel } from './import-rule-form-dispatch-prop.model';
import { ImportRuleFormOwnPropModel } from './import-rule-form-own-prop.model';
import { ImportRuleFormModel } from './import-rule-form.model';

//#endregion application imports

export interface ImportRuleFormPropModel extends
    FormPropModel<ImportRuleFormModel>,
    PageBasePropModel,
    ImportRuleFormOwnPropModel,
    ImportRuleFormDispatchPropModel {
}