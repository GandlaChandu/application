//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url } from '../../../utilities';
import { apiHandler, IAppActionModel } from '../../../core';
import { Helper } from '../../../shared';

import { ScheduleModel } from '../models';

//#endregion application imports

class ScheduleService {

    //#region public functions

    /**
     * fetches schedule info from DB
     * @param dispatch
     * @param clientInfo
     */
    public fetchSchedule(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, id: number) {
        return apiHandler.get(`${Url.getApplicationAnalyzerUrl(Url.apiUrl.fetchScheduleApi)}${id}`, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * saves schedule info to DB
     * @param dispatch
     * @param clientInfo
     */
    public saveSchedule(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, schedule: ScheduleModel) {
        if (schedule.id) {
            return apiHandler.put(Url.getApplicationAnalyzerUrl(Url.apiUrl.scheduleUpdateApi), schedule, dispatch, Helper.setHeaderAuthToken());
        }
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.scheduleSaveApi), schedule, dispatch, Helper.setHeaderAuthToken());
    }

    //#nedregion public functions

}

export const scheduleService = new ScheduleService();