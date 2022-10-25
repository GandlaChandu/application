//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url } from '../../../utilities';
import { PageRequestModel, Helper, sharedService } from '../../../shared';

import { ProjectManagerRequestModel } from './models/project-manager-request.model';

//#endregion application imports

class ProjectManagerService {

    /**
     * gets project list
     * @param dispatch
     */
    public getProjects(pageRequestModel: ProjectManagerRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.projectListApi), pageRequestModel, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * get all clients
     * @param pageRequestModel
     * @param dispatch
     */
    public getClients(pageRequestModel: PageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return sharedService.getClients(dispatch);
    }

    /**
     * gets all divisions for client id
     * @param clientId
     * @param pageRequestModel
     * @param dispatch
     */
    public getDivisions(clientId: number, pageRequestModel: PageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return sharedService.getDivisionsForClient(clientId, dispatch);
    }
}

export const projectManagerService = new ProjectManagerService();