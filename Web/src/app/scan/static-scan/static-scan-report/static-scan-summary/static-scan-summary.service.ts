//#region react imports

import { Dispatch } from 'redux';

//#endregion react imports

//#region application imports

import { apiHandler } from '../../../../core';
import { Url } from '../../../../utilities';
import { Helper } from '../../../../shared';

//#endregion application imports

class StaticScanSummaryService {

    //#region public functions

    /**
     * initiate scan api
     * @param dispatch
     * @param scanId
     */
    public getStaticScanSummary(dispatch: Dispatch, scanId: number) {
        const url = `${Url.getStaticScanUrl(Url.apiUrl.staticScanResultSummaryApi)}${scanId}`;
        return apiHandler.get(url, dispatch, Helper.setHeaderAuthToken());
    }


    //#endregion public functions
}

export const staticScanSummaryService = new StaticScanSummaryService();