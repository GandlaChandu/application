//#region react imports
//#endregion react imports

//#region application imports

import { DynamicScanReportDispatchPropModel } from './dynamic-scan-report-dispatch-prop.model';
import { DynamicScanReportOwnPropModel } from './dynamci-scan-report-own-prop.model';

//#endregion application imports

export interface DynamicScanReportPropModel extends DynamicScanReportDispatchPropModel, DynamicScanReportOwnPropModel {
    ticketTypeId?: number;
    ticketingType: string;
    clientName: string;
    divisionName: string;
}