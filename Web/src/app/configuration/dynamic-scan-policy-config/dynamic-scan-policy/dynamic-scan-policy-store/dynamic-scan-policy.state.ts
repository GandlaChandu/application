//#region react imports
//#endregion react imports

//#region application imports

import { PagedResult } from '../../../../shared';

import { DynamicScanPolicyModel, DynamicCategoryModel } from '../../models';
import { DynamicScanPolicyConfigState } from '../../dynamic-scan-policy-config-store';

//#endregion application imports

export class DynamicScanPolicyState extends DynamicScanPolicyConfigState {

    //#region model properties

    public dynamicScanPolicyInfo?: DynamicScanPolicyModel;
    public policyCategories?: PagedResult<DynamicCategoryModel>;

    //#endregion  model properties

    //#region constructor

    constructor() {
        super();
        this.policyCategories = new PagedResult<DynamicCategoryModel>();
    }

    //#endregion constructor

}