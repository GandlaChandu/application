//#region react imports
//#endregion react imports

//#region application imports

import { PageBasePropModel } from '../../../../shared';

import { ScheduleState } from '../schedule-store';
import { ScheduleModel } from '../../models';

//#endregion application imports

export interface ScheduleOwnPropModel extends PageBasePropModel, ScheduleState  {
    scheduleInfo?: ScheduleModel;
}