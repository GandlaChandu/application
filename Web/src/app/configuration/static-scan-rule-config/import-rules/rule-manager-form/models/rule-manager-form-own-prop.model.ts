//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel, GridRowModel } from '../../../../../shared';

import { ImportRuleState } from '../../import-rule-store';
import { RuleManagerFormModel } from './rule-manager-form.model';

//#endregion application imports

export interface RuleManagerFormOwnPropModel extends ImportRuleState, ListPageBasePropModel<GridRowModel<RuleManagerFormModel>> {
}