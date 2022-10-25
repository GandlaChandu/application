//#region react imports
//#endregion react imports

//#region application imports

import { ProjectFormModel } from '../../../../configuration';
import { TicketinIssueRequestModel } from '../../../ticketing-issue/models';

//#endregion application imports

export class StaticScanReportModel extends TicketinIssueRequestModel {
    public key?: string;
    public rule?: string;
    public severity?: string;
    public component?: string;
    public project?: string;
    public line?: number;
    public hash?: string;
    public status?: string;
    public message?: string;
    public creationDate?: Date;
    public updateDate?: Date;
    public organization?: string;
    public ticketSystemStatus?: any;
    public ticketType?: ProjectFormModel;
    public codeOrCodeURL: string;
    public id: number;
    public projectId: number;
    public scanIssueId?: string;
}