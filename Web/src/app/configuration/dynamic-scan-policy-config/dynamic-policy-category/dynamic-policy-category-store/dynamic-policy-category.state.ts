//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel, GridRowModel, FormListState } from '../../../../shared';

import { DynamicScannerModel, DynamicCategoryModel } from '../../models';
import { DynamicScanPolicyConfigState } from '../../dynamic-scan-policy-config-store';

//#endregion application imports

export class DynamicPolicyCategoryState implements FormListState<DynamicScannerModel>, DynamicScanPolicyConfigState {
    public formlist?: GridRowModel<DynamicScannerModel>[];
    public dynamicCategoryInfo?: DynamicCategoryModel;

    public attackStrengthTypes?: SelectListItemModel[];
    public alertThresholdTypes?: SelectListItemModel[];
    constructor() {
        this.formlist = [];
        this.attackStrengthTypes = [];
        this.alertThresholdTypes = [];
    }
}