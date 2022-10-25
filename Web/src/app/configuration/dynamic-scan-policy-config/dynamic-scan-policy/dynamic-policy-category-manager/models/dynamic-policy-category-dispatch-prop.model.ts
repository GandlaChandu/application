//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../../shared';

//#endregion application imports

export interface DynamicPolicyCategoryDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchDynamicScanPolicies?: (scanPolicyCode: string, errorCallback: (error) => void) => void;
}
