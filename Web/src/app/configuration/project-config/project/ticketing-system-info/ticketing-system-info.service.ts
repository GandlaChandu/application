//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../../core';
import { Url } from '../../../../utilities';
import { Helper } from '../../../../shared';

//#endregion application imports

class TicketingSystemInfoService {

    //#region public functions

    /**
     * removes ticket configuration and project mappings from DB
     * @param dispatch
     */
    public removeTicketMapping(ticketId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.put(Url.getTicketSystemUrl(`${Url.apiUrl.removeTicketMappingAPI}/${ticketId}`), '', dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const ticketingSystemInfoService = new TicketingSystemInfoService();