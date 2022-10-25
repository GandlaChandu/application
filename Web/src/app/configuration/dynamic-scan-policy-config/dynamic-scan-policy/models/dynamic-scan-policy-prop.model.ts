//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseOwnPropModel } from '../../../../shared';

import { DynamicScanPolicyDispatchPropModel } from './dynamic-scan-policy-dispatch-prop.model';
import { DynamicScanPolicyState } from '../dynamic-scan-policy-store';

//#endregion application imports

export interface DynamicScanPolicyPropModel extends DynamicScanPolicyDispatchPropModel, PageBaseOwnPropModel, DynamicScanPolicyState {
}