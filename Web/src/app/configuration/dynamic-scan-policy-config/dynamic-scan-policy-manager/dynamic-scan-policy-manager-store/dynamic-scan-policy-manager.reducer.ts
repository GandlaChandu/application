//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { DynamicScanPolicyManagerState } from './dynamic-scan-policy-manager.state';
import { DynamicScanPolicyManagerActionType } from './dynamic-scan-policy-manager-action-type.enum';

//#endregion application imports

const initialDynamicScanPolicyManagerState: DynamicScanPolicyManagerState = new DynamicScanPolicyManagerState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function dynamicPolicyManagerReducer(state: DynamicScanPolicyManagerState = initialDynamicScanPolicyManagerState, action: IAppActionModel<DynamicScanPolicyManagerState>): DynamicScanPolicyManagerState {
    switch (action.type) {
        case DynamicScanPolicyManagerActionType.FetchDynamicScanRules:
            return {
                ...state,
                gridResultData: action.payload.gridResultData
            };
        default:
            return state;
    }
}


