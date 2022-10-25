//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { PagedResult, PageRequestModel } from '../../../../shared';
import { IAppActionModel, ApiResponseModel } from '../../../../core';

import { UserManagerActionType } from './user-manager-action-type.enum';
import { userManagerService } from '../user-manager.service';
import { UserManagerState } from './user-manager.state';
import { UserModel } from '../../models';

//#endregion application imports

export class UserManagerActionCreator {

    //#region public functions

    /**
     * action to users info to store
     * @param pageRequest
     * @param errorCallback
     */
    public static fetchUsers(pageRequest: PageRequestModel, errorCallback: (error) => void): ThunkDispatch<UserManagerState, any, IAppActionModel<UserManagerState>> {
        return (dispatch: ThunkDispatch<UserManagerState, any, IAppActionModel<UserManagerState>>) => {
            userManagerService.fetchUsers(pageRequest, dispatch).then(
                (response: ApiResponseModel<PagedResult<UserModel>>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: UserManagerActionType.FetchUsers,
                            payload: { users: response.data }
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