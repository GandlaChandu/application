
//#region react imports
//#endregion react imports

//#region application imports

import { TicketSystemType } from '../../../../utilities';
import { PagedResult, StaticScanDetailModel } from '../../../../shared';

import { StaticScanSummaryModel } from '../static-scan-summary';
import { TicketingIssueState } from '../../../ticketing-issue';
import { StaticScanReportModel } from '../models';

//#endregion application imports

export class StaticScanReportState extends TicketingIssueState {

    //#region model properties

    public staticScanResults?: PagedResult<StaticScanDetailModel>;
    public summary?: StaticScanSummaryModel;
    public showPopup?: boolean;
    public ticketInfo?: StaticScanReportModel;
    public selectedTicketingSystemType?: TicketSystemType;

    //#endregion  model properties

    //#region constructor

    constructor() {
        super();
        this.staticScanResults = new PagedResult<StaticScanDetailModel>();
        this.ticketInfo = new StaticScanReportModel();
    }

    //#endregion constructor

}