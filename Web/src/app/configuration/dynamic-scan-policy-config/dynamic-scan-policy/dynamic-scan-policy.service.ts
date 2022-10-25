//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url } from '../../../utilities';
import { Helper } from '../../../shared';

import { DynamicScanPolicyModel } from '../models';
import { DynamicScanPolicyState } from './dynamic-scan-policy-store';

//#endregion application imports

class DynamiscScanRuleService {

    //#region public functions

    /**
     * gets dynamic scan policy categories info
     * @param scanPolicyCode
     * @param dispatch
     */
    public getPolicyCategoriesInfo(scanPolicyCode: string, dispatch: ThunkDispatch<DynamicScanPolicyState, any, IAppActionModel<DynamicScanPolicyState>>) {
        return apiHandler.get(`${Url.getDynamicScanUrl(Url.apiUrl.dynamicFetchCategoriesApi)}?scanPolicyCode=${scanPolicyCode}`, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets selected dynamic scan policy info
     * @param scanPolicyId
     * @param dispatch
     */
    public getDynamicScanPolicyInfo(scanPolicyId: number, dispatch: ThunkDispatch<DynamicScanPolicyState, any, IAppActionModel<DynamicScanPolicyState>>) {
        return apiHandler.get(`${Url.getDynamicScanUrl(Url.apiUrl.dynamicFetcScanPolicyById)}${scanPolicyId}`, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * save dynamic scan rule
     * @param dispatch
     */
    public saveDynamicScanPolicy(data: DynamicScanPolicyModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getDynamicScanUrl(Url.apiUrl.dynamicSaveScanPolicyApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * update dynamic scan rule
     * @param dispatch
     */
    public updateDynamicScanPolicy(data: DynamicScanPolicyModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.put(Url.getDynamicScanUrl(Url.apiUrl.dynamicUpdateScanPolicyApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const dynamicScanPolicyService = new DynamiscScanRuleService();