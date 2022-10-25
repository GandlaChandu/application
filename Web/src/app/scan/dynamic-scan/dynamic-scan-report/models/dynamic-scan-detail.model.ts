//#region react imports
//#endregion react imports

//#region application imports

import { TicketinIssueRequestModel } from '../../../ticketing-issue/models';

//#endregion application imports

export class DynamicScanDetailModel extends TicketinIssueRequestModel {
    public id: number;
    public dynamicScanId: number;
    public createdbyId: number;
    public createdOn: Date;
    public modifiedbyId?: number;
    public modifiedOn?: Date;
    public alertMessage: string;
    public risk: number | string;
    public reliability: number;
    public confidence: number;
    public url: string;
    public other: string;
    public parameter: string;
    public attack: string;
    public evidence: string;
    public description: string;
    public reference: string;
    public solution: string;
    public cweId: number;
    public wascId: number;
    public riskLevel: string;
    public confidenceLevel: string;
    public issueStatus?: string;
    public ticketSystemType?: number;
    public scanIssueId?: string;
    public projectId: number;
    public ticketSystemStatus?: any;

}