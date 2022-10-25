//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../shared';
import { DashboardState } from '../dashboard-store';

//#endregion application imports

export interface DashboardOwnPropModel extends ListPageBasePropModel<any>, DashboardState  {
}