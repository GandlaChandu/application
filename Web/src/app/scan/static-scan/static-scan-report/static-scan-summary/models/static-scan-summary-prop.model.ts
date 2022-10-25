//#region react imports
//#endregion react imports

//#region application imports

import { StaticScanSummaryDispatchPropModel } from './static-scan-summary-dispatch-prop.model';
import { StaticScanReportState } from '../../static-scan-report-store';

//#endregion application imports

export interface StaticScanSummaryPropModel extends StaticScanSummaryDispatchPropModel, StaticScanReportState{
    scanId: number;
}