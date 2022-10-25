//#region react imports
//#endregion react imports

//#region application imports

import { TicketSystemType } from '../../../../../utilities';

//#endregion application imports

export interface TicketingSystemInfoFormDispatchPropModel {
    dispatchShowTicketForm?: (showTicketForm: boolean) => void;
    dispatchCurrentTicketSystemType: (ticketSystemtype: TicketSystemType) => void;
    dispatchTokenBasedState: (enabled: boolean) => void;
    dispatchEnterpriseAccountState: (enabled: boolean) => void;
    dispatchRemoveTicketMapping: (ticketId: number, successCallback: (response) => void, errorCallback: (error) => void) => void;
}