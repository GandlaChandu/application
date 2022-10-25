//#region react imports

import { Dispatch } from 'redux';

//#endregion react imports

//#region application imports

import { apiHandler } from '../../../core';
import { Url } from '../../../utilities';
import { Helper } from '../../../shared';


//#endregion application imports

class DynamicScanTriggerService {

    //#region public functions

    /**
     * initiate scan api
     * @param dispatch
     * @param projectId
     */
    public initiateScan(dispatch: Dispatch, projectId: number) {
        if (projectId) {
            return apiHandler.post(
                `${Url.getDynamicScanUrl(Url.apiUrl.triggerDynamicScanApi)}${projectId}`,
                null,
                dispatch, Helper.setHeaderAuthToken()
            );
        }
    }


    //#endregion public functions
}

export const dynamicScanTriggerService = new DynamicScanTriggerService();