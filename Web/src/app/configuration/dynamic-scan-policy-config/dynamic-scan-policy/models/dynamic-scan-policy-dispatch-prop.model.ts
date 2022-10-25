//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../shared';

import { DynamicScanPolicyModel, DynamicCategoryModel } from '../../models';

//#endregion application imports

export interface DynamicScanPolicyDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchSetPolicyInfo: (scanPolicy: DynamicScanPolicyModel) => void;
    dispatchFetchPolicyInfo: (scanPolicyId: number, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchFetchAlertShresholdTypes: (errorCallback: (error) => void) => void;
    dispatchFetchAttackStrengthTypes: (errorCallback: (error) => void) => void;
    dispatchSaveDynamicScanRules: (dynamicScanRule: DynamicScanPolicyModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
}