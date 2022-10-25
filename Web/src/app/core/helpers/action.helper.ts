//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../models';

//#endregion application imports

export class ActionHelper {

    //#region public methods

    /**
     * creates action for given key and data
     * @param key
     * @param data
     */
    public static createAction<T>(key: string, data: T) {
        return (dispatch: ThunkDispatch<T, any, IAppActionModel<T>>) => {
            dispatch({
                type: key,
                payload: data
            });
        };
    }

    //#endregion public methods

    //#region private methods
    //#endregion Private methods
}