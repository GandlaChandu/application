//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url } from '../../../utilities';
import { apiHandler, IAppActionModel } from '../../../core';
import { Helper } from '../../../shared';

import { UserModel } from '../models';

//#endregion application imports

class UserService {

    //#region public functions

    /**
     * fetches user info from DB
     * @param dispatch
     * @param clientInfo
     */
    public fetchUser(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, id: number) {
        return apiHandler.get(`${Url.getApplicationAnalyzerUrl(Url.apiUrl.fetchUserApi)}${id}`, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * saves user info to DB
     * @param dispatch
     * @param clientInfo
     */
    public saveUser(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, user: UserModel) {
        if (user.id) {
            return apiHandler.put(Url.getApplicationAnalyzerUrl(Url.apiUrl.userUpdateApi), user, dispatch, Helper.setHeaderAuthToken());
        }
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.userSaveApi), user, dispatch, Helper.setHeaderAuthToken());
    }

    //#nedregion public functions

}

export const userService = new UserService();