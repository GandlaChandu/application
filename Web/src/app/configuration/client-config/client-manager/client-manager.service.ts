//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, apiHandler } from '../../../core';
import { Url } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';

//#endregion application imports

class ClientManagerService {

    //#region public functions

    /**
     * fetches client info
     * @param dispatch
     */
    public fetchClients(pageRequestModel: PageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        const clientListRequest ={
            listParameter: pageRequestModel
        };
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.clientListApi), clientListRequest, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const clientManagerService = new ClientManagerService();