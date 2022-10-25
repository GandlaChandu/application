//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../shared';

import { RecentScanModel } from '../models';

//#endregion application imports

export interface RecentScanOwnPropModel extends ListPageBasePropModel<RecentScanModel> {
    namespace?: string;
}