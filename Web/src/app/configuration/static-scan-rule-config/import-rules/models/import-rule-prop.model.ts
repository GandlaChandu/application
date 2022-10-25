//#region react imports
//#endregion react imports

//#region application imports

import { PageBasePropModel } from '../../../../shared';

import { ImportRuleDispatchPropModel } from './import-rule-dispatch-prop.model';
import { ImportRuleOwnPropModel } from './import-rule-own-prop.model';

//#endregion application imports

export interface ImportRulePropModel extends ImportRuleDispatchPropModel, ImportRuleOwnPropModel, PageBasePropModel {
}