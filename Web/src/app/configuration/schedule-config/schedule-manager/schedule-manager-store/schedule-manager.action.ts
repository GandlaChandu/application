//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { PagedResult, PageRequestModel, SuccessFn, ErrorFn } from '../../../../shared';
import { IAppActionModel, ApiResponseModel } from '../../../../core';

import { ScheduleManagerActionType } from './schedule-manager-action-type.enum';
import { scheduleManagerService } from '../schedule-manager.service';
import { ScheduleManagerState } from './schedule-manager.state';
import { ScheduleModel } from '../../models';

//#endregion application imports

export class ScheduleManagerActionCreator {

    //#region public functions

    /**
     * action to users info to store
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchSchedules(pageRequest: PageRequestModel, errorCallback: ErrorFn): ThunkDispatch<ScheduleManagerState, any, IAppActionModel<ScheduleManagerState>> {
        return (dispatch: ThunkDispatch<ScheduleManagerState, any, IAppActionModel<ScheduleManagerState>>) => {
            scheduleManagerService.fetchSchedules(pageRequest, dispatch).then(
                (response: ApiResponseModel<PagedResult<ScheduleModel>>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: ScheduleManagerActionType.FetchSchedules,
                            payload: { schedules: response.data }
                        });
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        };
    }

    /**
     * action to call delete schedule info
     * @param schedule
     * @param successCallback
     * @param errorCallback
     */
    public static deleteSchedule(schedule: ScheduleModel, successCallback: SuccessFn, errorCallback: ErrorFn): ThunkDispatch<ScheduleManagerState, any, IAppActionModel<ScheduleManagerState>> {
        return (dispatch: ThunkDispatch<ScheduleManagerState, any, IAppActionModel<ScheduleManagerState>>) => {
            scheduleManagerService.deleteSchedule(dispatch, schedule).then(successCallback, errorCallback);
        };
    }

    //#endregion public functions
}