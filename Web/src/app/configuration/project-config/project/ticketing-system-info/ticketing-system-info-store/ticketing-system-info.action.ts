//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../../core';
import { TicketSystemType } from '../../../../../utilities';

import { TicketingSystemInfoActionType } from './ticketing-system-info-action-type.enum';
import { ticketingSystemInfoService } from '../ticketing-system-info.service';
import { TicketingSystemInfoState } from './ticketing-system-info.state';

//#endregion application imports

export class TicketingSystemInfoActionCreator {

    //#region public functions

    /**
     * action to set ticket form state info to store
     * @param showTicketForm
     */
    public static setTicketFormState(showTicketForm: boolean): ThunkDispatch<TicketingSystemInfoState, any, IAppActionModel<TicketingSystemInfoState>> {
        return (dispatch: ThunkDispatch<TicketingSystemInfoState, any, IAppActionModel<any>>) => {
            dispatch({
                type: TicketingSystemInfoActionType.ShowTicketForm,
                payload: { showTicketForm: showTicketForm }
            });
        };
    }

    /**
     * action to set ticket config display state info to store
     * @param ticketSystemType
     */
    public static setCurrentTicketSystemType(ticketSystemType: TicketSystemType): ThunkDispatch<TicketingSystemInfoState, any, IAppActionModel<TicketingSystemInfoState>> {
        return (dispatch: ThunkDispatch<TicketingSystemInfoState, any, IAppActionModel<TicketingSystemInfoState>>) => {
            dispatch({
                type: TicketingSystemInfoActionType.CurrentTicketSystemType,
                payload: { selectedTicketingSystemType: ticketSystemType }
            });
        };
    }

    /**
     * action to set token account display state info to store
     * @param enabled
     */
    public static setTokenState(enabled: boolean): ThunkDispatch<TicketingSystemInfoState, any, IAppActionModel<TicketingSystemInfoState>> {
        return (dispatch: ThunkDispatch<TicketingSystemInfoState, any, IAppActionModel<TicketingSystemInfoState>>) => {
            dispatch({
                type: TicketingSystemInfoActionType.TokenBasedAccountState,
                payload: { isTokenBased: enabled }
            });
        };
    }

    /**
     * action to set enterprise account display state info to store
     * @param enabled
     */
    public static setEnterpriseAccount(enabled: boolean): ThunkDispatch<TicketingSystemInfoState, any, IAppActionModel<TicketingSystemInfoState>> {
        return (dispatch: ThunkDispatch<TicketingSystemInfoState, any, IAppActionModel<TicketingSystemInfoState>>) => {
            dispatch({
                type: TicketingSystemInfoActionType.EnterpriseAccountState,
                payload: { isEnterpriseAccount: enabled }
            });
        };
    }


    /**
     * action to remove ticket configuration mapping from project to store
     * @param ticketId
     * @param successCallback
     * @param errorCallback
     */
    public static removeTicketMapping(ticketId: number, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            ticketingSystemInfoService.removeTicketMapping(ticketId, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        successCallback(response)
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        }
    }

    //#endregion public functions

    //#region private functions
    //#endregion private functions
}

