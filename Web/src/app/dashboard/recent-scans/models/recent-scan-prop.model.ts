//#region react imports
//#endregion react imports

//#region application imports

import { RecentScanDispatchPropModel } from './recent-scan-dispatch-prop.model';
import { RecentScanOwnPropModel } from './recent-scan-own-prop.model';
import { DashboardState } from '../../dashboard-store';

//#endregion application imports

export interface RecentScanPropModel extends RecentScanOwnPropModel, RecentScanDispatchPropModel, DashboardState {

}