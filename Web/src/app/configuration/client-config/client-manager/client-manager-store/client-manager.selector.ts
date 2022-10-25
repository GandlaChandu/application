//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { ClientManagerState } from './client-manager.state';

//#endregion application imports


class ClientManagerSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets client info for client
     * @param state
     */
    public getClients(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.clientManagerReducer] ?
                (state[Constant.reducerKey.clientManagerReducer] as ClientManagerState).gridResultData : {},
            (gridResultData) => gridResultData
        );
        return selector(state);
    }

}

export const clientManagerSelector = new ClientManagerSelector();

