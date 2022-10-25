//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel, SelectListItemModel } from '../../../shared';

import { TicketingIssueDispatchPropModel } from './ticketing-issue-dispatch-prop.model';
import { TicketinIssueRequestModel, TicketingIssueOwnPropModel } from '../models'

//#endregion application imports

export interface TicketingIssuePropModel extends FormPropModel<any>, TicketingIssueDispatchPropModel, TicketingIssueOwnPropModel {
    isEdit?: boolean;
    ticketSystemInfo?: TicketinIssueRequestModel;
    projectId?: number;
    scanType?: number;
    assignees?: SelectListItemModel[];
    labels?: SelectListItemModel[];
    milestones?: SelectListItemModel[];
    type?: number;
    ticketingType?: string;
}