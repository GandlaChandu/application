//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { PagedResult, StaticScanDetailModel } from '../../../../shared';

import { StaticScanReportState } from './static-scan-report.state';
import { StaticScanReportModel } from '../models';

//#endregion application imports


class StaticScanReportSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets static scan result from state
     * @param state
     */
    public getStaticScanResults(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticScanReportReducer] ?
                (state[Constant.reducerKey.staticScanReportReducer] as StaticScanReportState).staticScanResults : new PagedResult<StaticScanDetailModel>(),
            (staticScanResults) => staticScanResults
        );
        return selector(state);
    }

    /**
     * gets popup state
     * @param state
     */
    public getPopupState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticScanReportReducer] ?
                (state[Constant.reducerKey.staticScanReportReducer] as StaticScanReportState).showPopup : false,
            (showPopup) => showPopup
        );
        return selector(state);
    }

    /**
     * gets popup state
     * @param state
     */
    public getTicketIssueInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticScanReportReducer] ?
                (state[Constant.reducerKey.staticScanReportReducer] as StaticScanReportState).ticketInfo : new StaticScanReportModel(),
            (ticketInfo) => ticketInfo
        );
        return selector(state);
    }

    /**
     * gets ticketId
     * @param state
     */
    public getTicketTypeId(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticScanReportReducer] ?
                (state[Constant.reducerKey.staticScanReportReducer] as StaticScanReportState).ticketTypeId : null,
            (ticketTypeId) => ticketTypeId
        );
        return selector(state);
    }

    /**
     * gets ticket type
     * @param state
     */
    public getTicketType(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticScanReportReducer] ?
                (state[Constant.reducerKey.staticScanReportReducer] as StaticScanReportState).ticketingType : null,
            (ticketTypeId) => ticketTypeId
        );
        return selector(state);
    }

    //#endregion public functions

}

export const staticScanReportSelector = new StaticScanReportSelector();

