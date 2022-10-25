//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../shared';

import { ScheduleManagerDispatchModel } from './schedule-manager-dispatch.model';
import { ScheduleModel } from '../../models';

//#endregion application imports

export interface ScheduleManagerPropModel extends ListPageBasePropModel<ScheduleModel>, ScheduleManagerDispatchModel {
}