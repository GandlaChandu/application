//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, PageRequestModel, SuccessFn, ErrorFn } from '../../../../shared';

//#endregion application imports

export interface StaticScanListDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchStaticResults: (pageRequest: PageRequestModel, errorCallback: ErrorFn) => void;
    dispatchInitiateScan: (projectId: number, successCallback: SuccessFn, errorCallback: ErrorFn) => void;

}