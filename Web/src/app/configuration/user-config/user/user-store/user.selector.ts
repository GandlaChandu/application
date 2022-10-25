//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { UserState } from './user.state';
import { UserModel } from '../../models';

//#endregion application imports


class UserSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets user info
     * @param state
     */
    public getUser(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.userReducer] ?
                (state[Constant.reducerKey.userReducer] as UserState).user : new UserModel(),
            (user) => user
        );
        return selector(state);
    }

    /**
     * gets role options info
     * @param state
     */
    public getRoles(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.userReducer] ?
                (state[Constant.reducerKey.userReducer] as UserState).roleOptions : [],
            (roleOptions) => roleOptions
        );
        return selector(state);
    }

    //#endregion public functions

}

export const userSelector = new UserSelector();

