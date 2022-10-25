//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { ImportRuleState } from './import-rule.state';
import { ImportRuleActionType } from './import-rule-action-type.enum';

//#endregion application imports

const importRuletState: ImportRuleState = new ImportRuleState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function ImportRuleReducer(state: ImportRuleState = importRuletState, action: IAppActionModel<ImportRuleState>): ImportRuleState {

    switch (action.type) {
        case ImportRuleActionType.FetchSeverityTypes:
            return {
                ...state,
                severityTypes: action.payload.severityTypes
            };
        case ImportRuleActionType.FetchVulnerabilityTypes:
            return {
                ...state,
                vulnerabilityTypes: action.payload.vulnerabilityTypes,
            };
        case ImportRuleActionType.FetchRules:
            return {
                ...state,
                rules: action.payload.rules,
                total: action.payload.total,
                formlist: action.payload.formlist
            };
        case ImportRuleActionType.SetSelectedLanguage:
            return {
                ...state,
                selectedLanguage: action.payload.selectedLanguage,
            };
        case ImportRuleActionType.SetFilterFormData:
            return {
                ...state,
                filterFormData: action.payload.filterFormData,
            };
        case ImportRuleActionType.FetchProfileBasedRules:
            return {
                ...state,
                profileBasedRules: action.payload.profileBasedRules,
            };
        default:
            return state;
    }
}


