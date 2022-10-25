//#region react imports
//#endregion react imports

//#region application imports

import { DynamicPolicySectionState } from '../dynamic-policy-section-store';

//#endregion application imports

export interface DynamicPolicySectionOwnPropModel extends DynamicPolicySectionState {
    namespace?: string;
    name?: string;
}
