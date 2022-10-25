//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../shared';
import { DynamicScanDetailModel } from './dynamic-scan-detail.model';

//#endregion application imports

export interface DynamicScanReportOwnPropModel extends ListPageBasePropModel<DynamicScanDetailModel> {
    showPopup?: boolean;
    ticketIssueInfo?: DynamicScanDetailModel;
}