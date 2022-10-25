//#region react imports
//#endregion react imports

//#region application imports

import { SelectListItemModel } from '../../../shared';

//#endregion application imports

export class DynamicScanPolicyConfigState {
    public attackStrengthTypes?: SelectListItemModel[];
    public alertThresholdTypes?: SelectListItemModel[];

    constructor() {
        this.attackStrengthTypes = [];
        this.alertThresholdTypes = [];
    }
}