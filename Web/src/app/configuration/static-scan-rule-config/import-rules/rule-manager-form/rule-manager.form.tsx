//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';
import { reduxForm } from 'redux-form';

//#endregion react imports

//#region application imports

import { GlobalState, formlistContainerHelper } from '../../../../shared';
import { IAppActionModel } from '../../../../core';
import { Constant } from '../../../../utilities';

import { importRuleSelector, ImportRuleActionCreator } from '../import-rule-store';
import { RuleManagerFormOwnPropModel, RuleManagerFormDispatchPropModel } from './models';
import { RuleFilterRequestModel } from '../models';
import { RuleActivationRequestModel, RuleModel, ProfileRulePageRequestModel } from '../../models';
import { RuleManagerFormComponent } from './rule-manager-form.component';
import { RuleManagerFormConstant } from './rule-manager-form.constant';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, RuleManagerFormOwnPropModel> {
    return createStructuredSelector(
        {
            ...formlistContainerHelper().mapStateToPropsBase(state, Constant.reducerKey.importRulesReducer),
            filterFormData: (state) => importRuleSelector.getFilterFormData(state),
            profileBasedRules: (state) => importRuleSelector.getQualityProfileRules(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): RuleManagerFormDispatchPropModel {
    return {
        ...formlistContainerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchRules: (pageRequest: RuleFilterRequestModel, profileRules: RuleModel[], errorCallback: (error?: any) => void) =>
            dispatch(ImportRuleActionCreator.fetchRules(pageRequest, profileRules, errorCallback)),
        dispatchSaveUpdateProfileRules: (ruleActivationRequest: RuleActivationRequestModel, successCallback: (response) => void, errorCallback: (error) => void) =>
            dispatch(ImportRuleActionCreator.changeRuleActivation(ruleActivationRequest, successCallback, errorCallback)),
        dispatchFetchProfileBasedRules: (profileRuleRequest: ProfileRulePageRequestModel, ruleRequest: RuleFilterRequestModel, errorCallback: (error?: any) => void) =>
            dispatch(ImportRuleActionCreator.fetchProfileBasedRules(profileRuleRequest, ruleRequest, errorCallback)),
    };
}

const RuleManagerReduxForm = reduxForm<any, any>({
    form: RuleManagerFormConstant.form,
    enableReinitialize: true
})(RuleManagerFormComponent);

export const RuleManagerForm = connect(mapStateToProps, mapDispatchToProps)(RuleManagerReduxForm);

