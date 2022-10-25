//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, ErrorFn, SuccessFn } from '../../../../shared';

import { ScheduleModel, ScheduleRequestModel } from '../../models';

//#endregion application imports

export interface ScheduleDispatchModel extends PageBaseDispatchPropModel {
    dispatchSetSchedule?: (schedule: ScheduleModel, initialSchedule: ScheduleModel) => void;
    dispatchFetchAndSetSchedule?: (id: number, errorCallback: ErrorFn) => void;
    dispatchSaveSchedule?: (schedule: ScheduleRequestModel, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
    dispacthConfigPopupState?: (show: boolean) => void;
    dispatchSetCronValue?: (cron: string) => void;
}