//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';

//#endregion application imports

class DynamicScanListService {

    //#region public functions

    /**
     * gets dynamic scans
     * @param dispatch
     * @param pageRequest
     */
    public getDynamicScans(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, pageRequest: PageRequestModel) {
        const dynamicScanListRequest = {
            listParameter: pageRequest
        };
        return apiHandler.post(Url.getDynamicScanUrl(Url.apiUrl.dynamicScanListApi), dynamicScanListRequest, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const dynamicScanListService = new DynamicScanListService();