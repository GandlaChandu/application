//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel, ErrorFn } from '../../../shared';

//#endregion application imports

export interface TicketingIssueDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchGetIssuesInfo: (issueId: number, projectId: number, ticketType: number, errorCallback: ErrorFn) => void;
}