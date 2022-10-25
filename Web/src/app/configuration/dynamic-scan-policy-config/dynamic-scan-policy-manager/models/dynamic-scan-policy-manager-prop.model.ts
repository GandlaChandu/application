//#region react imports
//#endregion react imports

//#region application imports

import { ListPageBasePropModel } from '../../../../shared';

import { DynamicScanPolicyModel } from '../../models';
import { DynamicScanPolicyManagerDispatchPropModel } from './dynamic-scan-policy-manager-dispatch-prop.model';

//#endregion application imports

export interface DynamicScanPolicyManagerPropModel extends ListPageBasePropModel<DynamicScanPolicyModel>, DynamicScanPolicyManagerDispatchPropModel {

}