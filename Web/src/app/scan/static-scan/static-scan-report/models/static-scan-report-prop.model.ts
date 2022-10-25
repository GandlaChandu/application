//#region react imports
//#endregion react imports

//#region application imports

import { StaticScanReportDispatchPropModel } from './static-scan-report-dispatch-prop.model';
import { StaticScanReportOwnPropModel } from './static-scan-report-own-prop.model';

//#endregion application imports

export interface StaticScanReportPropModel extends StaticScanReportDispatchPropModel, StaticScanReportOwnPropModel {
    ticketTypeId?: number;
    ticketingType?: string;
}