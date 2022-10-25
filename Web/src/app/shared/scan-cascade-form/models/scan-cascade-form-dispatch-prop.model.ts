//#region react imports
//#endregion react imports

//#region application imports

import { ScanTypeEnum } from '../../../utilities';

//#endregion application imports

export interface ScanCascadeFormDispatchPropModel {
    dispatchFetchClients: (errorCallback: (error?: any) => void) => void;
    dispatchFetchDivisions: (id: number, errorCallback: (error?: any) => void) => void;
    dispatchFetchProjects: (id: number, errorCallback: (error?: any) => void, scanType?: ScanTypeEnum) => void;
    dispatchFetchScanTypes: (errorCallback: (error?: any) => void) => void;
    dispatchSetClientId: (id: number) => void;
    dispatchSetDivisionId: (id: number) => void;
    dispatchSetProjectId: (id: number) => void;
    dispatchSetScanTypeId: (id: number) => void;
}