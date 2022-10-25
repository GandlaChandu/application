//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { PageState, PagedResult } from '../../../../shared';

import { DynamicScanPolicyState } from './dynamic-scan-policy.state';
import { DynamicScanPolicyActionType } from './dynamic-scan-policy-action-type.enum';
import { dynamicScanPolicyService } from '../dynamic-scan-policy.service';
import { DynamicScanPolicyModel, DynamicCategoryModel } from '../../models';

//#endregion application imports

export class DynamicScanPolicyActionCreator {

    //#region public functions

    /**
     * action to fetch dynamic scan policies info and set to store
     * @param scanPolicyCode
     * @param errorCallback
     */
    public static fetchPolicyCategoriesInfo(scanPolicyCode: string, errorCallback: (error?: any) => void): ThunkDispatch<DynamicScanPolicyState, any, IAppActionModel<DynamicScanPolicyState>> {
        return (dispatch: ThunkDispatch<DynamicScanPolicyState, any, IAppActionModel<DynamicScanPolicyState>>) => {
            if (scanPolicyCode) {
                dynamicScanPolicyService.getPolicyCategoriesInfo(scanPolicyCode, dispatch).then(
                    (response: ApiResponseModel<DynamicCategoryModel[]>) => {
                        let results = response.isSuccess ? response.data : [];
                        dispatch({
                            type: DynamicScanPolicyActionType.FetchDynamicPolicyCategories,
                            payload: {
                                policyCategories: {
                                    items: results,
                                    total: results.length
                                }
                            }
                        });
                    },
                    errorCallback
                );
            }
            else {
                dispatch({
                    type: DynamicScanPolicyActionType.FetchDynamicPolicyCategories,
                    payload: {
                        policyCategories: new PagedResult<DynamicCategoryModel>()
                    }
                });
            }
        }
    }

    /**
     * action to fetch selected dynamic scan policy info and set to store
     * @param policyId
     * @param successCallback
     * @param errorCallback
     */
    public static fetchSelectedPolicyInfo(policyId: number, successCallback: (response) => void, errorCallback: (error?: any) => void): ThunkDispatch<DynamicScanPolicyState, any, IAppActionModel<DynamicScanPolicyState>> {
        return (dispatch: ThunkDispatch<DynamicScanPolicyState, any, IAppActionModel<DynamicScanPolicyState>>) => {
            if (policyId > 0) {
                dynamicScanPolicyService.getDynamicScanPolicyInfo(policyId, dispatch).then(
                    (response: ApiResponseModel<DynamicScanPolicyModel>) => {
                        if (response && response.isSuccess) {
                            dispatch(this.setSelectedPolicyInfo(response.data));
                            successCallback(response);
                        }
                        else {
                            dispatch(this.setSelectedPolicyInfo(null));
                            errorCallback(response);
                        }
                    },
                    errorCallback
                );
            }
            else {
                dispatch(this.setSelectedPolicyInfo(null));
            }
        }
    }
    /**
    * action to fetch selected dynamic scan policy info and set to store
    * @param policyId
    * @param successCallback
    * @param errorCallback
    */
    public static setSelectedPolicyInfo(scanPolicy: DynamicScanPolicyModel) {
        return (dispatch: ThunkDispatch<DynamicScanPolicyState, any, IAppActionModel<DynamicScanPolicyState>>) => {
            dispatch({
                type: DynamicScanPolicyActionType.SetDynamicPolicyInfo,
                payload: {
                    dynamicScanPolicyInfo: scanPolicy
                }
            });
        }
    }

    /**
     * action to save dynamic scan Policy info
     * @param projectRequest
     * @param successCallback
     * @param errorCallback
     */
    public static saveDynamicScanPolicyInfo(dynamicScanPolicyRequest: DynamicScanPolicyModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<DynamicScanPolicyState, any, IAppActionModel<DynamicScanPolicyState>>) => {
            if (dynamicScanPolicyRequest.id > 0) {
                dynamicScanPolicyService.updateDynamicScanPolicy(dynamicScanPolicyRequest, dispatch).then(successCallback, errorCallback);
            }
            else {
                dynamicScanPolicyService.saveDynamicScanPolicy(dynamicScanPolicyRequest, dispatch).then(successCallback, errorCallback);
            }

        };
    }

    //#endregion public functions
}