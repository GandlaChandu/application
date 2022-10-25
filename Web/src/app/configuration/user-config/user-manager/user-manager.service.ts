//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, apiHandler } from '../../../core';
import { Url } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';

//#endregion application imports

class UserManagerService {

    //#region public functions

    /**
     * fetches user info
     * @param dispatch
     */
    public fetchUsers(pageRequestModel: PageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        const request = {
            excludeInactive: true,
            listParameter: pageRequestModel
        };
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.fetchAllUsersApi), request, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const userManagerService = new UserManagerService();