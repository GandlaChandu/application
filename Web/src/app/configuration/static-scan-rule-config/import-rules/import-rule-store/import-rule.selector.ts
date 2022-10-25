//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { PagedResult, GridRowModel } from '../../../../shared';

import { ImportRuleState } from './import-rule.state';
import { RuleModel } from '../../models';

//#endregion application imports


class ImportRuleSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets Languages for rules
     * @param state
     */
    public getSeverityTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.importRulesReducer] ?
                (state[Constant.reducerKey.importRulesReducer] as ImportRuleState).severityTypes : [],
            (severityTypes) => severityTypes
        );
        return selector(state);
    }

    /**
     * gets Vulnerabilities for rules
     * @param state
     */
    public getVulnerabilityyTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.importRulesReducer] ?
                (state[Constant.reducerKey.importRulesReducer] as ImportRuleState).vulnerabilityTypes : [],
            (vulnerabilityTypes) => vulnerabilityTypes
        );
        return selector(state);
    }

    /**
    * gets all rules
    * @param state
    */
    public getAllRules(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.importRulesReducer] ?
                (state[Constant.reducerKey.importRulesReducer] as ImportRuleState).rules : new PagedResult<GridRowModel<RuleModel>>(),
            (importRules) => importRules
        );
        return selector(state);
    }

    /**
    * gets selected language
    * @param state
    */
    public getLanguage(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.importRulesReducer] ?
                (state[Constant.reducerKey.importRulesReducer] as ImportRuleState).selectedLanguage : null,
            (selectedLanguage) => selectedLanguage
        );
        return selector(state);
    }

    /**
     * gets selected language
     * @param state
     */
    public getSelectedLanguage(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.importRulesReducer] ?
                (state[Constant.reducerKey.importRulesReducer] as ImportRuleState).selectedLanguage : null,
            (selectedLanguage) => selectedLanguage
        );
        return selector(state);
    }

    /**
     * gets rule filter form data language
     * @param state
     */
    public getFilterFormData(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.importRulesReducer] ?
                (state[Constant.reducerKey.importRulesReducer] as ImportRuleState).filterFormData : null,
            (selectedLanguage) => selectedLanguage
        );
        return selector(state);
    }

    /**
     * gets profile based rules from state
     * @param state
     */
    public getQualityProfileRules(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.importRulesReducer] ?
                (state[Constant.reducerKey.importRulesReducer] as ImportRuleState).profileBasedRules : new PagedResult<RuleModel>(),
            (profileBasedRules) => profileBasedRules
        );
        return selector(state);
    }

    //#endregion public functions

}

export const importRuleSelector = new ImportRuleSelector();

