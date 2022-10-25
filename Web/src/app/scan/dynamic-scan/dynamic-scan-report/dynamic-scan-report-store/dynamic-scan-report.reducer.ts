//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { DynamicScanReportState } from './dynamic-scan-report.state';
import { DynamicScanReportActionType } from './dynamic-scan-report-action-type.enum';
import { TicketingIssueActionType } from '../../../ticketing-issue/ticketing-issue-store';

//#endregion application imports

const initialDynamicScanReportState: DynamicScanReportState = new DynamicScanReportState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function dynamicScanReportReducer(state: DynamicScanReportState = initialDynamicScanReportState, action: IAppActionModel<DynamicScanReportState>): DynamicScanReportState {
    switch (action.type) {
        case DynamicScanReportActionType.FetchDynamicScanResults:
            return {
                ...state,
                dynamicScanResults: action.payload.dynamicScanResults
            };
        case DynamicScanReportActionType.DynamicScanReportFileName:
            return {
                ...state,
                dynamicScanReportFileName: action.payload.dynamicScanReportFileName
            };
        case DynamicScanReportActionType.ShowPopup:
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
                milestone: action.payload.milestone,
                ticketingType: action.payload.ticketingType,
                ticketTypeId: action.payload.ticketTypeId
            }
        default:
            return state;
    }
}


