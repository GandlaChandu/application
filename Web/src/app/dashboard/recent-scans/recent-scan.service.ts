//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, apiHandler } from '../../core';
import { Url } from '../../utilities';
import { PageRequestModel, Helper } from '../../shared';

//#endregion application imports

class RecentScanService {

    //#region public functions 
    
    /**
     * fetches recent scans info
     * @param dispatch
     */
    public fetchRecentScans(pageRequest: PageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        const request = {
            listParameter: pageRequest
        };
        return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.fetchAllUsersApi), request, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const recentScanService = new RecentScanService();