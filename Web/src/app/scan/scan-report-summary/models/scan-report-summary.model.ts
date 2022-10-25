//#region react imports
//#endregion react imports

//#region application imports

import { PageBasePropModel } from '../../../shared';

//#endregion application imports

export interface ScanReportSummaryModel extends PageBasePropModel {
    client?: string;
    division?: string;
    project?: string;
    projectUrl?: string;
    startDate?: any;
    endDate?: any;
    ticketType?: any;
}