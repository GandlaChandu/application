//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../shared';

import { DynamicScanPolicyModel, DynamicPolicyScannerRequestModel }  from '../../models';

//#endregion application imports

export interface DynamicPolicyCategoryDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchSetCategoryInfo?: (categoryData: DynamicScanPolicyModel) => void;
    dispatchFetchPolicyScannerlist?: (pageRequest: DynamicPolicyScannerRequestModel, errorCallback: (error?: any) => void) => void;
    dispatchFetchAlertShresholdTypes?: (errorCallback: (error) => void) => void;
    dispatchFetchAttackStrengthTypes?: (errorCallback: (error) => void) => void;
    dispatchFetchPolicyInfo?: (scanPolicyId: number, errorCallback: (error) => void) => void;
}
