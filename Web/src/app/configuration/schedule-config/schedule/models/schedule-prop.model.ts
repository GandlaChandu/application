//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../shared';

import { ScheduleDispatchModel } from './schedule-dispatch.model';
import { ScheduleOwnPropModel } from './schedule-own-prop.model';
import { ScheduleDetailModel } from '../../models';

//#endregion application imports

export interface SchedulePropModel extends FormPropModel<ScheduleDetailModel>, ScheduleDispatchModel, ScheduleOwnPropModel {
}