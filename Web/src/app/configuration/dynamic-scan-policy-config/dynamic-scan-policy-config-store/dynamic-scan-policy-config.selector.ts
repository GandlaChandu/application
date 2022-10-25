//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { DynamicScanPolicyConfigState } from './dynamic-scan-policy-config.state';

//#endregion application imports


class DynamicScanPolicyConfigSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets alert threshold types
     * @param state
     * @param ownProps
     */
    public getAlertThresholTypes(state: any, ownProps) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as DynamicScanPolicyConfigState).alertThresholdTypes : [],
            (alertThresholTypes) => alertThresholTypes
        );
        return selector(state);
    }

    /**
     * gets attack strength types
     * @param state
     * @param ownProps
     */
    public getAttackStrengthTypes(state: any, ownProps) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as DynamicScanPolicyConfigState).attackStrengthTypes : [],
            (attackStrengthTypes) => attackStrengthTypes
        );
        return selector(state);
    }

}

export const dynamicPolicyConfigSelector = new DynamicScanPolicyConfigSelector();

