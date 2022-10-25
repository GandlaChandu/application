//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { DynamicPolicySectionState } from './dynamic-policy-section.state';

//#endregion application imports


class DynamicPolicySectionSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * Get ScanPolicies from ClientState
     * @param state 
     */
    public getScanPolicies(state: any, ownProps) {
        let selector = createSelector(
            (state: any) => state[ownProps.namespace] ?
                (state[ownProps.namespace] as DynamicPolicySectionState).scanPolicies : [],
            (scanPolicies) => scanPolicies
        );
        return selector(state);
    }


    //#endregion public functions

}

export const dynamicPolicySectionSelector = new DynamicPolicySectionSelector();

