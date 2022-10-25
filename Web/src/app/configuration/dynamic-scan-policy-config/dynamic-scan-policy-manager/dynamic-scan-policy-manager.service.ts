//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url } from '../../../utilities';
import { PageRequestModel, Helper } from '../../../shared';

//#endregion application imports

class DynamicScanPolicyManagerService {

    /**
     * gets dynamic scan rules list
     * @param dispatch
     */
    public getDynamicScanRules(pageRequestModel: PageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getDynamicScanUrl(Url.apiUrl.dynamicFetchScanPoliciesApi), pageRequestModel, dispatch, Helper.setHeaderAuthToken());
    }
}

export const dynamicPolicyManagerService = new DynamicScanPolicyManagerService();