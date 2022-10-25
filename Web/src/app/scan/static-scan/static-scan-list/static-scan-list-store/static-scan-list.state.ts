
//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult } from '../../../../shared';

import { StaticScanListModel } from '../models';

//#endregion application imports

export class StaticScanListState {
    public gridResultData: PagedResult<StaticScanListModel>;

    constructor() {
        this.gridResultData = new PagedResult<StaticScanListModel>();
    }
}