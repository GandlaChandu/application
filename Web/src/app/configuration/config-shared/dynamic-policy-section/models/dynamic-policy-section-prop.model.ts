//#region react imports
//#endregion react imports

//#region application imports

import { FormPropModel } from '../../../../shared';

import { DynamicPolicyModel } from './dynamic-policy.model';
import { DynamicPolicySectionDispatchModel } from './dynamic-policy-section-dispatch.model';
import { DynamicPolicySectionOwnPropModel } from './dynamic-policy-section-own-prop.model';

//#endregion application imports

export interface DynamicPolicySectionPropModel extends
    FormPropModel<DynamicPolicyModel>,
    DynamicPolicySectionDispatchModel,
    DynamicPolicySectionOwnPropModel {
}