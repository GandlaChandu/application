//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../core';
import { Url } from '../../utilities';
import { Helper } from '../../shared';

//#endregion application imports

class DynamicScanPolicyConfigService {

    /**
     * gets attack strngth types
     * @param dispatch
     */
    public getAttackStrengthTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getDynamicScanUrl(Url.apiUrl.dynamicFetchStrengthsApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets alert threshhold types
     * @param dispatch
     */
    public getAlertThresholdTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getDynamicScanUrl(Url.apiUrl.dynamicFetchThresholdsApi), dispatch, Helper.setHeaderAuthToken());
    }

}

export const dynamicPolicyConfigService = new DynamicScanPolicyConfigService();