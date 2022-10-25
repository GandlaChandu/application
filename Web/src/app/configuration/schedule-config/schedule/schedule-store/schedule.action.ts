//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { SuccessFn, ErrorFn, Helper } from '../../../../shared';

import { ScheduleState } from './schedule.state';
import { ScheduleActionType } from './schedule-action-type.enum';
import { scheduleService } from '../schedule.service';
import { ScheduleModel, ScheduleRequestModel } from '../../models';

//#endregion application imports

export class ScheduleActionCreator {

    //#region public functions

    /**
     * action to set schedule state info to store
     * @param schedule
     * @param initialSchedule
     */
    public static setSchedule(schedule: ScheduleModel, initialSchedule: ScheduleModel): ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>> {
        return (dispatch: ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>>) => {
            dispatch({
                type: ScheduleActionType.SetSchedule,
                payload: {
                    scheduleInfo: schedule,
                    initialScheduleInfo: initialSchedule,
                    ...schedule
                }
            });
        };
    }

    /**
     * action to fetch and set schedule state info to store
     * @param schedule
     * @param errorCallback
     */
    public static fetchAndSetSchedule(id: number, errorCallback: ErrorFn): ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>> {
        return (dispatch: ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>>) => {
            scheduleService.fetchSchedule(dispatch, id).then(
                (response: ApiResponseModel<ScheduleRequestModel>) => {
                    if (response && response.isSuccess) {
                        let schedule = this.getScheduleModel(response.data);
                        dispatch({
                            type: ScheduleActionType.SetSchedule,
                            payload:
                            {
                                initialScheduleInfo: { ...schedule },
                                scheduleInfo: schedule,
                                ...schedule,
                                scanTypeId: schedule.scanTypeId
                            }
                        });
                    }
                    else {
                        dispatch({
                            type: ScheduleActionType.SetSchedule,
                            payload: {}
                        });
                    }
                },
                errorCallback
            );

        };
    }

    /**
     * action to call save schedule info
     * @param schedule
     * @param successCallback
     * @param errorCallback
     */
    public static saveSchedule(schedule: ScheduleRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn): ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>> {
        return (dispatch: ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>>) => {
            scheduleService.saveSchedule(dispatch, schedule).then(successCallback, errorCallback);
        };
    }

    /**
     * action to set config display state info to store
     * @param show
     */
    public static setConfigState(show: boolean): ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>> {
        return (dispatch: ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>>) => {
            dispatch({
                type: ScheduleActionType.SetConfigState,
                payload: {
                    showConfig: show
                }
            });
        };
    }

    /**
     * action to set config display state info to store
     * @param cron
     */
    public static setCronValue(cron: string): ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>> {
        return (dispatch: ThunkDispatch<ScheduleState, any, IAppActionModel<ScheduleState>>) => {
            dispatch({
                type: ScheduleActionType.SetCronValue,
                payload: {
                    cronValue: cron
                }
            });
        };
    }

    /**
     * gets schedule model from response
     * @param response
     */
    public static getScheduleModel(response: ScheduleRequestModel) {
        let scheduleModel: ScheduleModel = new ScheduleModel();
        scheduleModel.clientId = response.clientId;
        scheduleModel.divisionId = response.divisionId;
        scheduleModel.id = response.id;
        scheduleModel.isDeleted = response.isDeleted;
        scheduleModel.isEnabled = response.isEnabled;
        scheduleModel.isScheduled = response.isScheduled;
        scheduleModel.name = response.name;
        scheduleModel.projectId = response.projectId;
        scheduleModel.schedule = {
            ...response.schedule,
            startDate: Helper.isValidDate(response.schedule?.startDate) ? new Date(response.schedule?.startDate) : null,
            endDate: Helper.isValidDate(response.schedule?.endDate) ? new Date(response.schedule?.endDate) : null
        };
        scheduleModel.scanTypeId = response.scanTypes?.map(x => x.scanType);
        return scheduleModel;
    }

    //#endregion public functions
}