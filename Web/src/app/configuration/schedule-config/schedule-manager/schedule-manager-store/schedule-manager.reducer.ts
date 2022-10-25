//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { ScheduleManagerState } from './schedule-manager.state';
import { ScheduleManagerActionType } from './schedule-manager-action-type.enum';

//#endregion application imports

const initialScheduleManagerState: ScheduleManagerState = new ScheduleManagerState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function scheduleManagerReducer(state: ScheduleManagerState = initialScheduleManagerState, action: IAppActionModel<ScheduleManagerState>): ScheduleManagerState {
    switch (action.type) {
        case ScheduleManagerActionType.FetchSchedules:
            return {
                ...state,
                schedules: action.payload.schedules
            };
        default:
            return state;
    }
}


