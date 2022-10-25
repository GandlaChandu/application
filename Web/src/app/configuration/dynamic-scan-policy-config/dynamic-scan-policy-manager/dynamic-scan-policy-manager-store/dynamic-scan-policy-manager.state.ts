//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult } from '../../../../shared';

import { DynamicScanPolicyModel } from '../../models';

//#endregion application imports

export class DynamicScanPolicyManagerState {
    public gridResultData?: PagedResult<DynamicScanPolicyModel>;

    constructor() {
        this.gridResultData = new PagedResult<DynamicScanPolicyModel>();
    }
}