//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { DynamicPolicyCategoryFormDispatchPropModel } from './dynamic-policy-category-form-dispatch-prop.model';
import { DynamicPolicyCategoryFormOwnPropModel } from './dynamic-policy-category-form-own-prop.model';
import { DynamicCategoryModel } from '../../../models';

//#endregion application imports

export interface DynamicPolicyCategoryFormPropModel extends
    FormPropModel<DynamicCategoryModel>,
    DynamicPolicyCategoryFormOwnPropModel,
    DynamicPolicyCategoryFormDispatchPropModel {
}