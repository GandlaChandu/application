//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult } from '../../../../shared';

import { ScheduleModel } from '../../models';

//#endregion application imports

export class ScheduleManagerState {
    public schedules?: PagedResult<ScheduleModel>;
}