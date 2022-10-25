//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../../utilities';

import { StaticScanReportState } from '../../static-scan-report-store';

//#endregion application imports


class StaticScanSummarySelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets static scan result from state
     * @param state
     */
    public getStaticScanSummary(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticScanReportReducer] ?
                (state[Constant.reducerKey.staticScanReportReducer] as StaticScanReportState).summary : {},
            (summary) => summary
        );
        return selector(state);
    }

    //#endregion public functions

}

export const staticScanSummarySelector = new StaticScanSummarySelector();

