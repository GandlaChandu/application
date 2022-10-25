//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../../utilities';

import { DynamicScanInfoState } from './dynamic-scan-info.state';

//#endregion application imports


class DynamicScanInfoSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets dynamic form state
     * @param state
     */
    public getDynamicFormState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as DynamicScanInfoState).showDynamicForm : false,
            (showDynamicForm) => showDynamicForm
        );
        return selector(state);
    }

    /**
     * gets token based state info
     * @param state
     */
    public getTokenBasedState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as DynamicScanInfoState).dynamicIsTokenBased : false,
            (isTokenBased) => isTokenBased
        );
        return selector(state);
    }

    //#endregion public functions

}

export const dynamicScanInfoSelector = new DynamicScanInfoSelector();

