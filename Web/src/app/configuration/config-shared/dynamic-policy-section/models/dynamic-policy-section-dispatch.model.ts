//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../shared';

//#endregion application imports

export interface DynamicPolicySectionDispatchModel extends PageBaseDispatchPropModel{
    dispatchFetchScanPolicies?: (errorCallback: (error?: any) => void) => void;
}