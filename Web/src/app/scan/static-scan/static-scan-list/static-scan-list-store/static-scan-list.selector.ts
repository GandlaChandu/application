//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { PagedResult } from '../../../../shared';

import { StaticScanListState } from './static-scan-list.state';
import { StaticScanListModel } from '../models';

//#endregion application imports


class StaticScanListSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets clients from state
     * @param state
     */
    public getStaticScanResults(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticScanListReducer] ?
                (state[Constant.reducerKey.staticScanListReducer] as StaticScanListState).gridResultData : new PagedResult<StaticScanListModel>(),
            (gridResultData) => gridResultData
        );
        return selector(state);
    }

    //#endregion public functions

}

export const staticScanListSelector = new StaticScanListSelector();

