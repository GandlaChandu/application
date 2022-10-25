//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';

import { UserState } from './user.state';
import { UserActionType } from './user-action-type.enum';
import { userService } from '../user.service';
import { UserModel } from '../../models';

//#endregion application imports

export class UserActionCreator {

    //#region public functions

    /**
     * action to set user state info to store
     * @param user
     */
    public static setUser(user: UserModel): ThunkDispatch<UserState, any, IAppActionModel<UserState>> {
        return (dispatch: ThunkDispatch<UserState, any, IAppActionModel<UserState>>) => {
            dispatch({
                type: UserActionType.SetUser,
                payload: {
                    user: user
                }
            });
        };
    }

    /**
     * action to fetch and set user state info to store
     * @param user
     * @param errorCallback
     */
    public static fetchAndSetUser(id: number, errorCallback: (response) => void): ThunkDispatch<UserState, any, IAppActionModel<UserState>> {
        return (dispatch: ThunkDispatch<UserState, any, IAppActionModel<UserState>>) => {
            userService.fetchUser(dispatch, id).then(
                (response: ApiResponseModel<UserModel>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: UserActionType.SetUser,
                            payload: {
                                user: response.data
                            }
                        });
                    }
                    else {
                        dispatch({
                            type: UserActionType.SetUser,
                            payload: {
                                user: {}
                            }
                        });
                    }
                },
                errorCallback
            );

        };
    }

    /**
     * action to call save user info
     * @param user
     * @param successCallback
     * @param errorCallback
     */
    public static saveUser(user: UserModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<UserState, any, IAppActionModel<UserState>> {
        return (dispatch: ThunkDispatch<UserState, any, IAppActionModel<UserState>>) => {
            userService.saveUser(dispatch, user).then(successCallback, errorCallback);
        };
    }

    //#endregion public functions
}