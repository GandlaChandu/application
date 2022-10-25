//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { PagedResult, ClientModel, PageRequestModel } from '../../../../shared';
import { IAppActionModel, ApiResponseModel } from '../../../../core';

import { ClientManagerActionType } from './client-manager-action-type.enum';
import { clientManagerService } from '../client-manager.service';
import { ClientManagerState } from './client-manager.state';

//#endregion application imports

export class ClientManagerActionCreator {

    //#region public functions

    /**
     * action to set page title state info to store
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchClients(pageRequest: PageRequestModel, errorCallback: (error) => void): ThunkDispatch<ClientManagerState, any, IAppActionModel<ClientManagerState>> {
        return (dispatch: ThunkDispatch<ClientManagerState, any, IAppActionModel<ClientManagerState>>) => {
            clientManagerService.fetchClients(pageRequest, dispatch).then(
                (response: ApiResponseModel<PagedResult<ClientModel>>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: ClientManagerActionType.FetchClient,
                            payload: { gridResultData: response.data }
                        });
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        };
    }

    //#endregion public functions
}