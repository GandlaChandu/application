//#region react imports
//#endregion react imports

//#region application imports

import { DashboardRequestModel } from '../models';
import { ScanSummaryDispatchPropModel } from '../scan-summary/models';

//#endregion application imports

export interface DashboardDispatchPropModel extends ScanSummaryDispatchPropModel {
    dispatchFetchVulnerabilityBySeverity?: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) => void;
    dispatchFetchRecentScans?: (recentScanRequest: DashboardRequestModel, errorCallback: (error) => void) => void;
    dispatchFetchTopVulnerabilityTypes?: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) => void;
    dispatchFetchVulnerabilityTrend?: (requestInfo: DashboardRequestModel, errorCallback: (error) => void) => void;
    dispatchSetFiltersInfo?: (info: DashboardRequestModel) => void;
    dispatchFetchTrendPeriod?: () => void;
    dispatchSetFilterState?: (show?: boolean) => void;
}