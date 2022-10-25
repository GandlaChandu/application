//#region react imports
//#endregion react imports

//#region application imports

import { RuleFilterRequestModel } from '../../models';
import { RuleActivationRequestModel, RuleModel, ProfileRulePageRequestModel } from '../../../models';

//#endregion application imports

export interface RuleManagerFormDispatchPropModel {
    dispatchFetchRules?: (pageRequest: RuleFilterRequestModel, profileRules: RuleModel[], errorCallback: (error?: any) => void) => void;
    dispatchSaveUpdateProfileRules: (ruleActivationRequest: RuleActivationRequestModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchFetchProfileBasedRules?: (profileRuleRequest: ProfileRulePageRequestModel, ruleRequest: RuleFilterRequestModel, errorCallback: (error?: any) => void) => void;

}