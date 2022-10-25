//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { ClientModel } from '../../../../shared';
import { Constant } from '../../../../utilities';

import { ClientState } from './client.state';

//#endregion application imports


class ClientSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets client info for client
     * @param state
     */
    public getClient(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.clientReducer] ?
                (state[Constant.reducerKey.clientReducer] as ClientState).client : new ClientModel(),
            (client) => client
        );
        return selector(state);
    }

    //#endregion public functions

}

export const clientSelector = new ClientSelector();

