//#region react imports
//#endregion react imports

//#region application imports

import { PageBasePropModel } from '../../../shared';
import { DashboardState } from '../../dashboard-store';

//#endregion application imports

export interface ScanSummaryOwnPropModel extends PageBasePropModel, DashboardState  {
    namespace?: string;
}