//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';
import { FormListActionType } from '../../../../shared';

import { DynamicPolicyCategoryState } from './dynamic-policy-category.state';
import { DynamicPolicyCategoryActionType } from './dynamic-policy-category-action-type.enum';
import { DynamicScanPolicyConfigActionType } from '../../dynamic-scan-policy-config-store';

//#endregion application imports

const initialDynamicPolicyCategoryState: DynamicPolicyCategoryState = new DynamicPolicyCategoryState();

/**
 * dynamic policy category actions reducer
 * @param state
 * @param action
 */
export function DynamicPolicyCategoryReducer(state: DynamicPolicyCategoryState = initialDynamicPolicyCategoryState, action: IAppActionModel<DynamicPolicyCategoryState>): DynamicPolicyCategoryState {
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
            };
        case DynamicPolicyCategoryActionType.SetPolicyCategoryInfo:
            return {
                ...state,
                dynamicCategoryInfo: action.payload.dynamicCategoryInfo,
            };
        case DynamicPolicyCategoryActionType.FetchDynamicScanners:
            return {
                ...state,
                formlist: action.payload.formlist
            };
        case FormListActionType.RefreshGridInfo:
            return {
                ...state,
                formlist: action.payload.formlist
            };
        default:
            return state;
    }
}


