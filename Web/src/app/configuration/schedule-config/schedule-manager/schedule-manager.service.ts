//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, apiHandler } from '../../../core';
import { Url } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';
import { ScheduleModel } from '../models';

//#endregion application imports

class ScheduleManagerService {

    //#region public functions

    /**
     * fetches schedules info
     * @param dispatch
     */
    public fetchSchedules(pageRequestModel: PageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        const request = {
            listParameter: pageRequestModel
        };
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.fetchAllSchedulesApi), request, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * deletes schedule info to DB
     * @param dispatch
     * @param clientInfo
     */
    public deleteSchedule(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, schedule: ScheduleModel) {
        return apiHandler.delete(`${Url.getApplicationAnalyzerUrl(Url.apiUrl.scheduleDeleteApi)}/${schedule.id}`, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const scheduleManagerService = new ScheduleManagerService();