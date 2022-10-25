//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { PagedResult } from '../../../../shared';

import { DynamicScanPolicyModel } from '../../models';
import { DynamicScanPolicyManagerState } from './dynamic-scan-policy-manager.state';

//#endregion application imports


class DynamicScanPolicyManagerSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets dynamic scan rules from state
     * @param state
     */
    public getDynamicScanRules(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dynamicScanRuleManagerReducer] ?
                (state[Constant.reducerKey.dynamicScanRuleManagerReducer] as DynamicScanPolicyManagerState).gridResultData : new PagedResult<DynamicScanPolicyModel>(),
            (dynamicScanRules) => dynamicScanRules
        );
        return selector(state);
    }

}

export const dynamicPolicyManagerSelector = new DynamicScanPolicyManagerSelector();

