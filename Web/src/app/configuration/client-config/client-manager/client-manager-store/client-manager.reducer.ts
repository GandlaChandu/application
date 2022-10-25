//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { ClientManagerState } from './client-manager.state';
import { ClientManagerActionType } from './client-manager-action-type.enum';

//#endregion application imports

const initialclientManagerState: ClientManagerState = new ClientManagerState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function clientManagerReducer(state: ClientManagerState = initialclientManagerState, action: IAppActionModel<ClientManagerState>): ClientManagerState {
    switch (action.type) {
        case ClientManagerActionType.FetchClient:
            return {
                ...state,
                gridResultData: action.payload.gridResultData
            };
        default:
            return state;
    }
}


