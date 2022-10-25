//#region react imports
//#endregion react imports

//#region application imports

import { PageBaseDispatchPropModel } from '../../../../shared';

import { LanguageProfileMapModel, ProfileRulePageRequestModel, RuleActivationRequestModel } from '../../models';

//#endregion application imports

export interface QualityProfileConfigDispatchPropModel extends PageBaseDispatchPropModel {
    dispatchFetchlanguageTypes: (errorCallback: (error?: any) => void) => void;
    dispatchQualityProfileInfo: (profileInfo: LanguageProfileMapModel) => void;
    dispatchprofileLanguage?: (profilelanguage: number) => void;
    dispatchSaveNewProfile: (profileSaveRequest: LanguageProfileMapModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
    dispatchFetchProfileBasedRules?: (pageRequest: ProfileRulePageRequestModel, errorCallback: (error?: any) => void) => void;
    dispatchSaveUpdateProfileRules: (ruleUpdationRequest: RuleActivationRequestModel, successCallback: (response) => void, errorCallback: (error) => void) => void;
}