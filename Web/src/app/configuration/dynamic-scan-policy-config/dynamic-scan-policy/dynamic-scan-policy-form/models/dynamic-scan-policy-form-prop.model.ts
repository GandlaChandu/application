//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../../shared';

import { DynamicScanPolicyFormOwnPropModel } from './dynamic-scan-policy-form-own-prop.model';
import { DynamicScanPolicyFormDispatchPropModel } from './dynamic-scan-policy-form-dispatch-prop.model';
import { DynamicScanPolicyModel } from '../../../models';

//#endregion application imports

export interface DynamicScanPolicyFormPropModel extends FormPropModel<DynamicScanPolicyModel>, DynamicScanPolicyFormOwnPropModel, DynamicScanPolicyFormDispatchPropModel {
 button?: any;
}