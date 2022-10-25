//#region react imports
//#endregion react imports

//#region application imports

import { DynamicPolicyScannerRequestModel, DynamicCategoryModel, DynamicScannerModel } from '../../../models';

//#endregion application imports

export interface DynamicScannerManagerDispatchPropModel {
    dispatchFetchPolicyScannerlist: (pageRequest: DynamicPolicyScannerRequestModel, errorCallback: (error?: any) => void) => void;
    dispatchUpdateScanner: (category: DynamicCategoryModel, scannerInfo: DynamicScannerModel, successCallback: (response) => void, errorCallback: (response) => void) => void;
}