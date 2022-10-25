//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export interface ProjectFormDispatchPropModel {
    dispatchFetchDivisions: (clientId: number, errorCallback: (error?: any) => void) => void;
    dispatchShowDivision: (show: boolean) => void;
}