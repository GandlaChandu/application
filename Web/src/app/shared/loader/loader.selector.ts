//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { GlobalState } from '../../shared';

//#endregion application imports


class LoaderSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets global loader open state
     */
    public getDisplayStateInfo(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => (state.coreState && state.coreState.loaderInfo ? state.coreState.loaderInfo.showLoader : false),
            (showLoader) => showLoader
        );
        return selector(state);
    }

    /**
     * gets global loader queue state
     */
    public getQueueInfo(state: GlobalState) {
        let selector = createSelector(
            (state: GlobalState) => (state.coreState && state.coreState.loaderInfo ? state.coreState.loaderInfo.queueCount : 0),
            (queueCount) => queueCount
        );
        return selector(state);
    }

    //#endregion public functions
}

export const loaderSelector = new LoaderSelector();

