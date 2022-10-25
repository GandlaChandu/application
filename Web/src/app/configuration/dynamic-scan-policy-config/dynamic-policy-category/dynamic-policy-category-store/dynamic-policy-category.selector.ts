//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { DynamicPolicyCategoryState } from './dynamic-policy-category.state';

//#endregion application imports

class DynamicPolicyCategorySelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets ingo about policy categories
     * @param state
     */
    public getPolicyCategoryInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dynamicPolicyCategoryReducer] ?
                (state[Constant.reducerKey.dynamicPolicyCategoryReducer] as DynamicPolicyCategoryState).dynamicCategoryInfo : null,
            (dynamicCategoryInfo) => dynamicCategoryInfo
        );
        return selector(state);
    }

    //#endregion public functions
}

export const dynamicPolicyCategorySelector = new DynamicPolicyCategorySelector();

