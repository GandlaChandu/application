//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, PageRequestModel, ErrorFn, SuccessFn } from '../../../../shared';

import { ScheduleModel } from '../../models';

//#endregion application imports

export interface ScheduleManagerDispatchModel extends PageBaseDispatchPropModel {
    dispatchFetchSchedules?: (pageRequestModel: PageRequestModel, errorCallback: ErrorFn) => void;
    dispatchDeleteSchedule?: (schedule: ScheduleModel, successCallback: SuccessFn, errorCallback: ErrorFn) => void;
}