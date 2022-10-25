//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, apiHandler } from '../../core';
import { Url, ScanTypeEnum } from '../../utilities';
import { Helper } from '../helpers';

//#endregion application imports

class SharedService {

    //#region public functions

    /**
     * gets clients
     */
    public getClients(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.activeClientListApi), {}, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * get divisions by project id
     * @param dispatch
     */
    public getDivisionsForClient(clientId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(`${Url.apiUrl.activeDivisionListApi}/${clientId}`), {}, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * get project by id
     * @param dispatch
     * @param divisionId
     * @param scanType
     */
    public getProjectsForDivision(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, divisionId: number, scanType?: ScanTypeEnum) {
        let url = Url.getApplicationAnalyzerUrl(`${Url.apiUrl.getActiveProjectsByDivisionIdApi}${divisionId}`);
        if (scanType) {
            url = `${url}/?scanType=${scanType}`;
        }
        return apiHandler.post(url, {}, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * get analysis types
     * @param dispatch
     */
    public getAnalysisTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getApplicationAnalyzerUrl(Url.apiUrl.getScanTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * get logged in user profile
    * @param dispatch
    */
    public getLoggedInUserInfo(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getApplicationAnalyzerUrl(Url.apiUrl.getLoggedInUserInfoApi), dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const sharedService = new SharedService();