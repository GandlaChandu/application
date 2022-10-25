//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { GlobalState } from '../../shared';

//#endregion application imports


class ErrorSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets global error condition
     */
    public getErrorInfo(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => state.coreState.errorInfo ? { ...state.coreState.errorInfo } : {},
            (errorInfo) => errorInfo
        );
        return selector(state);
    }

    //#endregion public functions
}

export const errorSelector = new ErrorSelector();

