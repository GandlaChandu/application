//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../shared';

import { DashboardRequestModel } from '../../models';

//#endregion application imports

export interface RecentScanDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchRecentScans?: (recentScanRequest: DashboardRequestModel, errorCallback: (error) => void) => void;
}