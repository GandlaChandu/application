//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../shared';

import { DashboardRequestModel } from '../../models';

//#endregion application imports

export interface ScanSummaryDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchScanSummary?: (request: DashboardRequestModel, errorCallback: (error) => void) => void;
    dispatchFetchLastScannedOn?: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) => void;
}