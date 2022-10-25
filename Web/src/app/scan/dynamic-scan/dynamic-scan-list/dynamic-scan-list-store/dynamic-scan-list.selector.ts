//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { DynamicScanListState } from './dynamic-scan-list.state';
import { PagedResult } from '../../../../shared';
import { DynamicScanListModel } from '../models';

//#endregion application imports


class DynamicScanListSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets clients from state
     * @param state
     */
    public getDynamicScanResults(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dynamicScanListReducer] ?
                (state[Constant.reducerKey.dynamicScanListReducer] as DynamicScanListState).dynamicScans : new PagedResult<DynamicScanListModel>(),
            (dynamicScans) => dynamicScans
        );
        return selector(state);
    }

    //#endregion public functions

}

export const dynamicScanListSelector = new DynamicScanListSelector();

