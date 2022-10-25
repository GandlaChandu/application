//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../shared';

import { TicketingIssueModel } from './ticketing-issue.model';

//#endregion application imports

export interface TicketingIssueOwnPropModel extends ListPageBasePropModel<TicketingIssueModel> {
    projectId?: number;
    assignees?: any;
    namespace?: string;
}