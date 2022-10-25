//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export interface StaticScanInfoFormDispatchPropModel {
    dispatchFetchScanTypes: (errorCallback: (error?: any) => void) => void;
    dispatchFetchSourceCodeTypes: (errorCallback: (error?: any) => void) => void;
    dispatchFetchSourceControlTypes: (errorCallback: (error?: any) => void) => void;
    dispacthQualityProfileTabState: (show: boolean) => void;
    dispatchShowForm?: (showForm: boolean) => void;    
    dispatchRemoveCodeMapping: (staticScanId: number, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchTokenBasedState: (enabled: boolean) => void;

}