//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel } from '../../../shared';

import { TicketinIssueRequestModel } from '../models'


//#endregion application imports

export class TicketingIssueState {

    //#region model properties

    public assignees?: SelectListItemModel[];
    public labels?: SelectListItemModel[];
    public milestone?: SelectListItemModel[];
    public issueInfo?: TicketinIssueRequestModel;
    public showPopup?: boolean;
    public ticketingType?: string;
    public ticketTypeId?: number;

    //#endregion  model properties

    //#region constructor

    constructor() {
        this.assignees = [];
        this.labels = [];
        this.milestone = [];
    }

    //#endregion constructor

}