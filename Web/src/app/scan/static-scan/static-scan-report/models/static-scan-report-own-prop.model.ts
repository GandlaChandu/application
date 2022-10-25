//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel, StaticScanDetailModel } from '../../../../shared';

import { StaticScanSummaryModel } from '../static-scan-summary';
import { ProjectFormModel } from '../../../../configuration/project-config/project/project-form/models'
import { StaticScanReportModel } from './static-scan-report.model';

//#endregion application imports

export interface StaticScanReportOwnPropModel extends ListPageBasePropModel<StaticScanDetailModel> {
    summary?: StaticScanSummaryModel;
    showPopup?: boolean;
    ticketIssueInfo?: StaticScanReportModel;
    ticketSystemInfo?: ProjectFormModel;
}