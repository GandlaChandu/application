//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export interface StaticScanSummaryDispatchPropModel {
    dispatchFetchStaticScanSummary: (scanId: number, errorCallback: (error?: any) => void) => void;
    dispatchError: () => void;
}