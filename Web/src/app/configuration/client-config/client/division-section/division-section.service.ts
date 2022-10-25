//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url } from '../../../../utilities';
import { IAppActionModel, apiHandler } from '../../../../core';
import { PageRequestModel, DivisionModel, Helper } from '../../../../shared';

//#endregion application imports

class DivisionSectionService {

    //#region public functions

    /**
     * gets client divisions
     * @param dispatch
     * @param client
     * @param pageRequest
     */
    public getClientDivisions(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, clientId: number, pageRequest: PageRequestModel) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(`${Url.apiUrl.divisionListApi}/${clientId}`), pageRequest, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * saves division info to DB
     * @param dispatch
     * @param division
     */
    public saveDivision(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, division: DivisionModel) {
        if (division.id) {
            return apiHandler.put(Url.getApplicationAnalyzerUrl(Url.apiUrl.divisionUpdateApi), division, dispatch, Helper.setHeaderAuthToken());
        }

        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.divisionSaveApi), division, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const divisionSectionService = new DivisionSectionService();