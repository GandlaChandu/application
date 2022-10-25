//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, PageRequestModel } from '../../../../shared';

//#endregion application imports

export interface DynamicScanPolicyManagerDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchDynamicScanRules?: (pageRequest: PageRequestModel, errorCallback: (error?: any) => void) => void;
}