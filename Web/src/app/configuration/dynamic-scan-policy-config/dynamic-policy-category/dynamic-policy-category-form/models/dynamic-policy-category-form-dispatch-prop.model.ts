//#region react imports
//#endregion react imports

//#region application import

import { DynamicCategoryModel } from '../../../models';

//#endregion application imports

export interface DynamicPolicyCategoryFormDispatchPropModel {
    dispatchUpdatePolicyStrengthThreshold: (updatePolicyInfo: DynamicCategoryModel, successCallback: (response) => void, errorCallback: (response) => void) => void;
}
