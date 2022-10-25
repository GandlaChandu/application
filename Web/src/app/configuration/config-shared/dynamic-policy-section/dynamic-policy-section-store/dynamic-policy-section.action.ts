//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { PageState, KeyNamePairModel } from '../../../../shared';

import { DynamicPolicySectionActionType } from './dynamic-policy-section-action-type.enum';
import { DynamicPolicySectionState } from './dynamic-policy-section.state';
import { dynamicPolicySectionService } from '../dynamic-policy-section.service';
import { DynamicPolicyModel } from '../models';

//#endregion application imports

export class DynamicPolicySectionActionCreator {

    //#region public functions

    /**
     * action to fetch dynamic scan policies and save to store
     * @param errorCallback
     */
    public static fetchScanPolicies(errorCallback: (error?: any) => void): ThunkDispatch<DynamicPolicySectionState, any, IAppActionModel<DynamicPolicySectionState>> {
        return (dispatch: ThunkDispatch<DynamicPolicySectionState, any, IAppActionModel<DynamicPolicySectionState>>) => {
            dynamicPolicySectionService.getScanPolicies(dispatch).then(
                (result: ApiResponseModel<KeyNamePairModel[]>) => {
                    if (result && result.isSuccess) {
                        dispatch({
                            type: DynamicPolicySectionActionType.FetchPolicies,
                            payload: {
                                scanPolicies: result.data.map(x => {
                                    return {
                                        value: x.id,
                                        label: x.name
                                    }
                                })
                            }
                        });
                    }
                    else {
                        errorCallback(result)
                    }
                },
                errorCallback
            );
        };
    }

    /**
    * action to save Dynamic Scan Policies info to store on Project save success
    * @param dynamicScanPoliciesModel 
    * @param isUpdate 
    * @param successCallback 
    * @param errorCallback 
    */
    public static saveDynamicScanPolicies(dynamicScanPoliciesModel: DynamicPolicyModel, isUpdate: boolean, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<DynamicPolicySectionState, any, IAppActionModel<DynamicPolicySectionState>>) => {
            if (isUpdate) {
                dynamicPolicySectionService.updateDynamicScanPolicies(dynamicScanPoliciesModel, dispatch).then(successCallback, errorCallback);
            }
            else {
                dynamicPolicySectionService.saveDynamicScanPolicies(dynamicScanPoliciesModel, dispatch).then(successCallback, errorCallback);
            }

        };
    }

    //#endregion public functions
}