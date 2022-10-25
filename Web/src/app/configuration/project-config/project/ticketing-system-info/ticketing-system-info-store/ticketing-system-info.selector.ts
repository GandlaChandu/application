//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant, TicketSystemType } from '../../../../../utilities';

import { TicketingSystemInfoState } from './ticketing-system-info.state';

//#endregion application imports


class TicketingSystemInfoSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets ticket form state
     * @param state
     */
    public getTicketFormState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as TicketingSystemInfoState).showTicketForm : false,
            (showTicketForm) => showTicketForm
        );
        return selector(state);
    }

    /**
     * gets selected ticket system type info
     * @param state
     */
    public getCurrentTicketSystemType(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as TicketingSystemInfoState).selectedTicketingSystemType : TicketSystemType.Unknown,
            (selectedTicketSystemType) => selectedTicketSystemType
        );
        return selector(state);
    }

    /**
     * gets token based state info
     * @param state
     */
    public getTokenBasedState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as TicketingSystemInfoState).isTokenBased : false,
            (isTokenBased) => isTokenBased
        );
        return selector(state);
    }

    /**
     * gets enterprise account info
     * @param state
     */
    public getEnterpriseAccountState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as TicketingSystemInfoState).isEnterpriseAccount : false,
            (isEnterpriseAccount) => isEnterpriseAccount
        );
        return selector(state);
    }

    //#endregion public functions

}

export const ticketingSystemInfoSelector = new TicketingSystemInfoSelector();

