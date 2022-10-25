//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url } from '../../../utilities';
import { IAppActionModel, apiHandler } from '../../../core';
import { Helper, UserRoleRequestModel } from '../../../shared';

import { UserMapRequestModel, UserMapPageRequestModel } from './models';

//#endregion application imports

class UserMapSectionService {

    //#region public functions

    /**
     * gets entity users
     * @param dispatch
     * @param pageRequest
     */
    public getEntityUsers(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, pageRequest: any) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.fetchEntityUsersApi), pageRequest, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets all active users
     * @param dispatch
     * @param pageRequest
     */
    public getAllActiveUsers(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, pageRequest: UserMapPageRequestModel) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(`${Url.apiUrl.fetchAllUsersApi}`), pageRequest, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * saves entity user map info to DB
     * @param dispatch
     * @param request
     */
    public saveEntityUser(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, request: UserMapRequestModel) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.saveEntityUserApi), request, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * removes entity user map info to DB
     * @param dispatch
     * @param id
     */
    public removeEntityUser(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, id: number) {
        return apiHandler.delete(Url.getApplicationAnalyzerUrl(`${Url.apiUrl.removeEntityUserApi}${id}`), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * saves entity user role map info to DB
     * @param dispatch
     * @param request
     */
    public saveEntityUserRole(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, request: UserRoleRequestModel[]) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.saveEntityUserRoleApi), request, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const userMapSectionService = new UserMapSectionService();