//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';

//#endregion application imports

class StaticScanListService {

    //#region public functions

    /**
     * gets static scans
     * @param dispatch
     * @param pageRequest
     */
    public getStaticScans(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>, pageRequest: PageRequestModel) {
        const data = {
            listParameter: {
                pagination: pageRequest.pagination
            }
        };
        return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.staticScanListApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const staticScanListService = new StaticScanListService();