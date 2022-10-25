//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Helper, KeyNamePairModel } from '../../../../shared';
import { IAppActionModel, ApiResponseModel } from '../../../../core';

import { DynamicScanPolicyModel, DynamicPolicyScannerRequestModel, DynamicCategoryModel } from '../../models';
import { DynamicScannerModel } from '../../models';
import { dynamicPolicyCategoryService } from '../dynamic-policy-category.service';

import { DynamicPolicyCategoryActionType } from './dynamic-policy-category-action-type.enum';
import { DynamicPolicyCategoryState } from './dynamic-policy-category.state';
import { DynamicScanPolicyConfigActionType } from '../../dynamic-scan-policy-config-store';
import { dynamicPolicyConfigService } from '../../dynamic-scan-policy-config.service';

//#endregion application imports

export class DynamicPolicyCategoryActionCreator {

    //#region public functions

    /**
     * action to set category profile details to store
     * @param categoryData
     */
    public static setPolicyCategoryInfo(categoryData: DynamicScanPolicyModel): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<DynamicPolicyCategoryState, any, IAppActionModel<DynamicPolicyCategoryState>>) => {
            dispatch({
                type: DynamicPolicyCategoryActionType.SetPolicyCategoryInfo,
                payload: {
                    dynamicCategoryInfo: categoryData
                }
            });
        };
    }

    /**
     * action to fetch attack strngth types and set to store
     * @param errorCallback
     */
    public static fetchAttackStrengthTypes(errorCallback: (error?: any) => void): ThunkDispatch<DynamicPolicyCategoryState, any, IAppActionModel<DynamicPolicyCategoryState>> {
        return (dispatch: ThunkDispatch<DynamicPolicyCategoryState, any, IAppActionModel<DynamicPolicyCategoryState>>) => {
            dynamicPolicyConfigService.getAttackStrengthTypes(dispatch).then(
                (response: ApiResponseModel<KeyNamePairModel[]>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DynamicScanPolicyConfigActionType.FetchAttackStrengthTypes,
                            payload: {
                                attackStrengthTypes: response.data.map(x => Helper.toSelectListItem(x))
                            }
                        });
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        }
    }

    /**
     * action to fetch alert threshold types and set to store
     * @param errorCallback
     */
    public static fetchAlertThresholdTypes(errorCallback: (error?: any) => void): ThunkDispatch<DynamicPolicyCategoryState, any, IAppActionModel<DynamicPolicyCategoryState>> {
        return (dispatch: ThunkDispatch<DynamicPolicyCategoryState, any, IAppActionModel<DynamicPolicyCategoryState>>) => {
            dynamicPolicyConfigService.getAlertThresholdTypes(dispatch).then(
                (response: ApiResponseModel<KeyNamePairModel[]>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: DynamicScanPolicyConfigActionType.FetchAlertThresholdTypes,
                            payload: {
                                alertThresholdTypes: response.data.map(x => Helper.toSelectListItem(x))
                            }
                        });
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        }
    }

    /**
     * action to fetch dynamic scan policy scanner state info to store
     * @param request
     * @param errorCallback
     */
    public static fetchScannerlList(request: DynamicPolicyScannerRequestModel,
        errorCallback: (error?: any) => void): ThunkDispatch<DynamicPolicyCategoryState, any, IAppActionModel<DynamicPolicyCategoryState>> {
        return (dispatch: ThunkDispatch<DynamicPolicyCategoryState, any, IAppActionModel<DynamicPolicyCategoryState>>) => {
            dynamicPolicyCategoryService.getScanners(request, dispatch).then(
                (response: ApiResponseModel<DynamicScannerModel[]>) => {
                    let results = response.isSuccess ? response.data : [];
                    dispatch({
                        type: DynamicPolicyCategoryActionType.FetchDynamicScanners,
                        payload: {
                            formlist: results.map((x, i) => Helper.toGridRowModel(x, i))
                        }
                    });
                },
                errorCallback
            );
        };
    }

    /**
     * action to save scanner based strength value to store
     * @param updatePolicyInfo
     * @param successCallback
     * @param errorCallback
     */
    public static updatePloicyStrengthThreshold(updatePolicyInfo: DynamicScanPolicyModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            dynamicPolicyCategoryService.updatePolicyStrengthThreshold(updatePolicyInfo, dispatch).then(successCallback, errorCallback);
        };
    }

    /**
     * action to save scanner based strength value to store
     * @param updatePolicyInfo
     * @param errorCallback
     */
    public static updateScannerInfo(categoryInfo: DynamicCategoryModel,
        data: DynamicScannerModel,
        successCallback: (response) => void,
        errorCallback: (response) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            dynamicPolicyCategoryService.updateScannerInfo(categoryInfo, data, dispatch).then(successCallback, errorCallback);
        };
    }
    //#endregion public functions
}