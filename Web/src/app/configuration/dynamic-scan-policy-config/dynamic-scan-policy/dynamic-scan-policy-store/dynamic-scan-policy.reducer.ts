//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { DynamicScanPolicyState } from './dynamic-scan-policy.state';
import { DynamicScanPolicyActionType } from './dynamic-scan-policy-action-type.enum';
import { DynamicScanPolicyConfigActionType } from '../../dynamic-scan-policy-config-store';

//#endregion application imports

const initialDynamicScanPolicyState: DynamicScanPolicyState = new DynamicScanPolicyState();

/**
 * dynamic scan rules actions reducer
 * @param state
 * @param action
 */
export function dynamicScanPolicyReducer(state: DynamicScanPolicyState = initialDynamicScanPolicyState, action: IAppActionModel<DynamicScanPolicyState>): DynamicScanPolicyState {
    switch (action.type) {
        case DynamicScanPolicyConfigActionType.FetchAlertThresholdTypes:
            return {
                ...state,
                alertThresholdTypes: action.payload.alertThresholdTypes
            };
        case DynamicScanPolicyConfigActionType.FetchAttackStrengthTypes:
            return {
                ...state,
                attackStrengthTypes: action.payload.attackStrengthTypes
            }
        case DynamicScanPolicyActionType.FetchDynamicPolicyCategories:
            return {
                ...state,
                policyCategories: action.payload.policyCategories
            };
        case DynamicScanPolicyActionType.FetchDynamicPolicyInfo:
            return {
                ...state,
                dynamicScanPolicyInfo: action.payload.dynamicScanPolicyInfo
            };
        case DynamicScanPolicyActionType.SetDynamicPolicyInfo:
            return {
                ...state,
                dynamicScanPolicyInfo: action.payload.dynamicScanPolicyInfo
            };
        default:
            return state;
    }
}


