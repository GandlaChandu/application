//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { PagedResult } from '../../../../shared';

import { DynamicScanPolicyState } from './dynamic-scan-policy.state';

//#endregion application imports


class DynamicScanPolicySelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

   /**
    * gets dynamic scan rules info
    * @param state
    */
    public getDynamicScanRuleInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dynamicScanPolicyReducer] ?
                (state[Constant.reducerKey.dynamicScanPolicyReducer] as DynamicScanPolicyState).dynamicScanPolicyInfo : null,
            (dynamicScanRuleInfo) => dynamicScanRuleInfo
           
        );
        return selector(state);
    }

    /**
     * gets dynamic scan policies info
     * @param state
     */
    public getDynamicScanPoliciesInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dynamicScanPolicyReducer] ?
                (state[Constant.reducerKey.dynamicScanPolicyReducer] as DynamicScanPolicyState).policyCategories : new PagedResult<any>(),
            (dynamicScanPolicies) => dynamicScanPolicies
        );
        return selector(state);
    }

    //#endregion public functions

}

export const dynamicScanPolicySelector = new DynamicScanPolicySelector();

