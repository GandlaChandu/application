//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { ClientModel, Helper } from '../../../shared';
import { Url } from '../../../utilities';
import { apiHandler, IAppActionModel } from '../../../core';

//#endregion application imports

class ClientService {

    //#region public functions

    /**
     * saves client info to DB
     * @param dispatch
     * @param clientInfo
     */
    public saveClient(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, clientInfo: ClientModel) {
        if (clientInfo.id) {

            return apiHandler.put(Url.getApplicationAnalyzerUrl(Url.apiUrl.clientUpdateApi), clientInfo, dispatch, Helper.setHeaderAuthToken());
        }
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.clientSaveApi), clientInfo, dispatch, Helper.setHeaderAuthToken());
    }

    //#nedregion public functions

}

export const clientService = new ClientService();