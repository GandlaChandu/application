//#region react imports
//#endregion react imports

//#region application imports

import { DashboardDispatchPropModel } from './dashboard-dispatch-prop.model';
import { DashboardOwnPropModel } from './dashboard-own-prop.model';
import { DashboardState } from '../dashboard-store';

//#endregion application imports

export interface DashboardPropModel extends DashboardOwnPropModel, DashboardDispatchPropModel, DashboardState {

}