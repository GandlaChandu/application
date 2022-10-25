//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { KeyNamePairModel, Helper } from '../../../shared';
import { IAppActionModel, ApiResponseModel } from '../../../core';

import { DynamicScanPolicyConfigState } from './dynamic-scan-policy-config.state';
import { DynamicScanPolicyConfigActionType } from './dynamic-scan-policy-config-action-type.enum';

import { dynamicPolicyConfigService } from '../dynamic-scan-policy-config.service';

//#endregion application imports

export class DynamicScanPolicyConfigActionCreator {

    //#region public functions

    /**
     * action to fetch attack strngth types and set to store
     * @param errorCallback
     */
    public static fetchAttackStrengthTypes(errorCallback: (error?: any) => void): ThunkDispatch<DynamicScanPolicyConfigState, any, IAppActionModel<DynamicScanPolicyConfigState>> {
        return (dispatch: ThunkDispatch<DynamicScanPolicyConfigState, any, IAppActionModel<DynamicScanPolicyConfigState>>) => {
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
    public static fetchAlertThresholdTypes(errorCallback: (error?: any) => void): ThunkDispatch<DynamicScanPolicyConfigState, any, IAppActionModel<DynamicScanPolicyConfigState>> {
        return (dispatch: ThunkDispatch<DynamicScanPolicyConfigState, any, IAppActionModel<DynamicScanPolicyConfigState>>) => {
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

    //#endregion public functions
}