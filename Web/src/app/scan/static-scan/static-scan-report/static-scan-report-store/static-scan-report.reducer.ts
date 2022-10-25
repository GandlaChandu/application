//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { StaticScanReportState } from './static-scan-report.state';
import { StaticScanReportActionType } from './static-scan-report-action-type.enum';
import { StaticScanSummaryActionType } from '../static-scan-summary';
import { TicketingIssueActionType } from '../../../ticketing-issue/ticketing-issue-store';

//#endregion application imports

const initialStaticScanReportState: StaticScanReportState = new StaticScanReportState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function staticScanReportReducer(state: StaticScanReportState = initialStaticScanReportState, action: IAppActionModel<StaticScanReportState>): StaticScanReportState {
    switch (action.type) {
        case StaticScanReportActionType.FetchStaticScanResults:
            return {
                ...state,
                staticScanResults: action.payload.staticScanResults
            };
        case StaticScanSummaryActionType.FetchStaticScanSummary:
            return {
                ...state,
                summary: action.payload.summary
            };
        case StaticScanReportActionType.ShowPopup:
            return {
                ...state,
                showPopup: action.payload.showPopup,
                ticketInfo: action.payload.ticketInfo
            };
        case TicketingIssueActionType.FetchIssueInfo:
            return {
                ...state,
                issueInfo: action.payload.issueInfo
            };
        case TicketingIssueActionType.FetchMetaData:
            return {
                ...state,
                assignees: action.payload.assignees,
                labels: action.payload.labels,
                ticketingType: action.payload.ticketingType,
                milestone: action.payload.milestone,
                ticketTypeId: action.payload.ticketTypeId
            }
     
        default:
            return state;
    }
}


