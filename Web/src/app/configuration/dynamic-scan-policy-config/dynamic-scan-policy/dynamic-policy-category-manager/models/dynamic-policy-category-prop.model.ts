//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../../shared';

import { DynamicPolicyCategoryDispatchPropModel } from './dynamic-policy-category-dispatch-prop.model';
import { DynamicScanPolicyState } from '../../dynamic-scan-policy-store';
import { DynamicCategoryModel } from '../../../models';

//#endregion application imports

export interface DynamicPolicyCategoryPropModel extends ListPageBasePropModel<DynamicCategoryModel>, DynamicPolicyCategoryDispatchPropModel, DynamicScanPolicyState {
}
