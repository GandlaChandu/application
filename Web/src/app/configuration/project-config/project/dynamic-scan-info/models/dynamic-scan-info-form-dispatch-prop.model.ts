//#region react imports
//#endregion react imports

//#region application imports

import {DynamicScanInfoFormModel} from './dynamic-scan-info-form.model';

//#endregion application imports

export interface DynamicScanInfoFormDispatchPropModel {
    dispatchShowDynamicForm?: (showForm: boolean) => void;
    dispatchRemoveAppMapping: (dynamicScanDetails: DynamicScanInfoFormModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchTokenBasedState: (enabled: boolean) => void;

}