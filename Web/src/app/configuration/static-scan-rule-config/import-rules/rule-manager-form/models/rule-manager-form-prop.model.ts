//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { RuleManagerFormModel } from './rule-manager-form.model';
import { RuleManagerFormOwnPropModel } from './rule-manager-form-own-prop.model';
import { RuleManagerFormDispatchPropModel } from './rule-manager-form-dispatch-prop.model';

//#endregion application imports

export interface RuleManagerFormPropModel extends
    FormPropModel<RuleManagerFormModel>,
    RuleManagerFormOwnPropModel,
    RuleManagerFormDispatchPropModel {
}