//#region react imports
//#endregion react imports

//#region application imports

import { TicketingIssueModel } from './ticketing-issue.model';

//#endregion application imports

export class TicketinIssueRequestModel {
    public projectId?: number;
    public scanIssueId?: string;
    public scanId?: number;
    public ticketSystemType?: number;
    public ticketSystemStatus?: any;
    public scanType?: number;
    public id?: number;
    public issueInformation?: TicketingIssueModel;
    public ticketSystemConfiguration?: TicketingIssueModel;
    public type?: number;
}