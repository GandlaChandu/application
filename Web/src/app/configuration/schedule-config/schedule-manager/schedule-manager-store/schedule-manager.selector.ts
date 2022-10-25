//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { ScheduleManagerState } from './schedule-manager.state';
import { PagedResult } from '../../../../shared';
import { ScheduleModel } from '../../models';

//#endregion application imports


class ScheduleManagerSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets Schedules
     * @param state
     */
    public getSchedules(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.scheduleManagerReducer] ?
                (state[Constant.reducerKey.scheduleManagerReducer] as ScheduleManagerState).schedules : new PagedResult<ScheduleModel>(),
            (users) => users
        );
        return selector(state);
    }

}

export const scheduleManagerSelector = new ScheduleManagerSelector();

