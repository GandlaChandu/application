//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel, ApiRequestModel, HttpType } from '../../../core';
import { Url } from '../../../utilities';
import { Helper } from '../../../shared';

import { DynamicCategoryModel, DynamicScannerModel, DynamicPolicyScannerRequestModel } from '../models';
import { DynamicPolicyCategoryState } from './dynamic-policy-category-store';

//#endregion application imports

class DynamicPolicyCategoryService {

    /**
     * gets dynamic scan policy scanner list
     * @param dispatch
     */
    public getScanners(pageRequestModel: DynamicPolicyScannerRequestModel, dispatch: ThunkDispatch<DynamicPolicyCategoryState, any, IAppActionModel<DynamicPolicyCategoryState>>) {
        return apiHandler.get(`${Url.getDynamicScanUrl(Url.apiUrl.dynamicFetchScannersApi)}${pageRequestModel.scanPolicyCode}/${pageRequestModel.categoryId}`, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * udate profile
     * @param dispatch
     */
    public updatePolicyStrengthThreshold(data: DynamicCategoryModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        if (data.attackStrength) {
            return apiHandler.get(`${Url.getDynamicScanUrl(Url.apiUrl.dynamicCategoryUpdateStrengthApi)}${data.scanPolicyCode}/${data.id}/${data.attackStrength}`, dispatch, Helper.setHeaderAuthToken());
        }
        else {
            return apiHandler.get(`${Url.getDynamicScanUrl(Url.apiUrl.dynamicCategoryUpdateThresholdApi)}${data.scanPolicyCode}/${data.id}/${data.alertThreshold}`, dispatch, Helper.setHeaderAuthToken());
        }
    }

    /**
     * updated scanner info
     * @param categoryInfo
     * @param data
     * @param dispatch
     */
    public updateScannerInfo(categoryInfo: DynamicCategoryModel, data: DynamicScannerModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        let thresholdRequest: ApiRequestModel = {
            url: `${Url.getDynamicScanUrl(Url.apiUrl.dynamicScannerUpdateThresholdApi)}${categoryInfo.scanPolicyCode}/${data.id}/${data.alertThreshold}`,
            headers: Helper.setHeaderAuthToken(),
            httpType: HttpType.Get
        };
        let attackRequest: ApiRequestModel = {
            url: `${Url.getDynamicScanUrl(Url.apiUrl.dynamicScannerUpdateStrengthApi)}${categoryInfo.scanPolicyCode}/${data.id}/${data.attackStrength}`,
            headers: Helper.setHeaderAuthToken(),
            httpType: HttpType.Get
        };
        return apiHandler.multiRequestCall([thresholdRequest, attackRequest], dispatch);
    }

}

export const dynamicPolicyCategoryService = new DynamicPolicyCategoryService();