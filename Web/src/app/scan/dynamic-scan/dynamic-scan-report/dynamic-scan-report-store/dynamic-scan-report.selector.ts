//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { DynamicScanReportState } from './dynamic-scan-report.state';
import { PagedResult } from '../../../../shared';
import { DynamicScanDetailModel } from '../models';

//#endregion application imports


class DynamicScanReportSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets dynamic scan result from state
     * @param state
     */
    public getDynamicScanResults(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dynamicScanReportReducer] ?
                (state[Constant.reducerKey.dynamicScanReportReducer] as DynamicScanReportState).dynamicScanResults : new PagedResult<DynamicScanDetailModel>(),
            (dynamicScanResults) => dynamicScanResults
        );
        return selector(state);
    }

    /**
     * gets dynamic scam report file name
     * @param state
     */
    public getDynamicScanReportFileNameInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dynamicScanReportReducer] ?
                (state[Constant.reducerKey.dynamicScanReportReducer] as DynamicScanReportState).dynamicScanReportFileName : '',
            (dynamicScanReportFileName) => dynamicScanReportFileName
        );
        return selector(state);
    }

    /**
     * gets popup state
     * @param state
     */
    public getPopupState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.dynamicScanReportReducer] ?
                (state[Constant.reducerKey.dynamicScanReportReducer] as DynamicScanReportState).showPopup : false,
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
            (state: any) => state[Constant.reducerKey.dynamicScanReportReducer] ?
                (state[Constant.reducerKey.dynamicScanReportReducer] as DynamicScanReportState).ticketInfo : new DynamicScanDetailModel(),
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
            (state: any) => state[Constant.reducerKey.dynamicScanReportReducer] ?
                (state[Constant.reducerKey.dynamicScanReportReducer] as DynamicScanReportState).ticketTypeId : null,
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
            (state: any) => state[Constant.reducerKey.dynamicScanReportReducer] ?
                (state[Constant.reducerKey.dynamicScanReportReducer] as DynamicScanReportState).ticketingType : null,
            (ticketTypeId) => ticketTypeId
        );
        return selector(state);
    }

    //#endregion public functions

}

export const dynamicScanReportSelector = new DynamicScanReportSelector();

