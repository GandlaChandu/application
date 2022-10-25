//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../shared';

//#endregion application imports

export interface StaticScanTriggerDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchInitiateScan: (projectId: number, successCallback: (response: any) => void, errorCallback: (error: any) => void) => void;
}