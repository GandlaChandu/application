
//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult } from '../../../../shared';

import { DynamicScanListModel } from '../models';

//#endregion application imports

export class DynamicScanListState {
    public dynamicScans: PagedResult<DynamicScanListModel>;

    constructor() {
        this.dynamicScans = new PagedResult<DynamicScanListModel>();
    }

}