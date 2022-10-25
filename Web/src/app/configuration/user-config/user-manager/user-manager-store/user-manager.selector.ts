//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { UserManagerState } from './user-manager.state';

//#endregion application imports


class UserManagerSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets users
     * @param state
     */
    public getUsers(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.userManagerReducer] ?
                (state[Constant.reducerKey.userManagerReducer] as UserManagerState).users : {},
            (users) => users
        );
        return selector(state);
    }

}

export const userManagerSelector = new UserManagerSelector();

