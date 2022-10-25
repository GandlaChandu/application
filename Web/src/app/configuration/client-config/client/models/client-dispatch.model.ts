//#region react imports
//#endregion react imports

//#region application imports

import { ClientModel, PageBaseDispatchPropModel, ErrorFn, SuccessFn, PageRequestModel } from '../../../../shared';

//#endregion application imports

export interface ClientDispatchModel extends PageBaseDispatchPropModel {
    dispatchSetClient?: (client: ClientModel) => void;
    dispatchFetchDynamicPolicy?: (client: ClientModel, errorCallback: ErrorFn) => void;
    dispatchDivisionTabState?: (show: boolean) => void;
    dispatchQualityProfileTabState?: (show: boolean) => void;
    dispatchUserMapTabState?: (show: boolean) => void;
    dispatchSaveClient?: (client: ClientModel, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispatchFetchDivisions?: (id: number, pageRequest: PageRequestModel, errorCallback: ErrorFn) => void;

}