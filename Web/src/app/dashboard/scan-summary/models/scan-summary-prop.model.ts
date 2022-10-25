//#region react imports
//#endregion react imports

//#region application imports

import { ScanSummaryOwnPropModel } from './scan-summary-own-prop.model';
import { ScanSummaryDispatchPropModel } from './scan-summary-dispatch-prop.model';
import {DashboardState} from '../../dashboard-store';

//#endregion application imports

export interface ScanSummaryPropModel extends ScanSummaryOwnPropModel, ScanSummaryDispatchPropModel,DashboardState  {
    scansCompleted?: number;
}