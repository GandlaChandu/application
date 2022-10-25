
//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult } from '../../../../shared';

import { DynamicScanDetailModel } from '../models';
import { TicketingIssueState } from '../../../ticketing-issue/ticketing-issue-store'

//#endregion application imports

export class DynamicScanReportState extends TicketingIssueState {

    //#region model properties

    public dynamicScanResults: PagedResult<DynamicScanDetailModel>;
    public dynamicScanReportFileName: string;
    public showPopup?: boolean;
    public ticketInfo?: DynamicScanDetailModel;
  
    //#endregion  model properties

    //#region constructor

    constructor() {
        super();
        this.dynamicScanResults = new PagedResult<DynamicScanDetailModel>();
        this.dynamicScanReportFileName = '';
        this.ticketInfo = new DynamicScanDetailModel();
    }

    //#endregion constructor

}