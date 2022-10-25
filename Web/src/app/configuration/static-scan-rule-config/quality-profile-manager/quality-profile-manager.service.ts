//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';

//#endregion application imports

class QualityProfileManagerService {

    /**
     * gets static scan profiles list
     * @param dispatch
     */
    public getStaticScanRules(pageRequestModel: PageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        const data = {
            listParameter: {
                pagination: pageRequestModel.pagination
            }
        };
        return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.staticScanRuleConfigFetchApi), data, dispatch, Helper.setHeaderAuthToken());
    }
}

export const qualityProfileManagerService = new QualityProfileManagerService();