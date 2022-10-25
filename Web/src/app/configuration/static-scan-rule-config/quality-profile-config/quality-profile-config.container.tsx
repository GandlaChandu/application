//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, injectReducer } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { QualityProfileConfigState, qualityProfileConfigSelector, QualityProfileConfigActionCreator, qualityProfileConfigReducer } from './quality-profile-config-store';
import { QualityProfileConfigOwnPropModel } from './models/quality-profile-config-own-prop.model';
import { QualityProfileConfigDispatchPropModel } from './models/quality-profile-config-dispatch-prop.model';
import { QualityProfileConfigComponent } from './quality-profile-config.component';
import { LanguageProfileMapModel, ProfileRulePageRequestModel, RuleActivationRequestModel } from '../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<QualityProfileConfigState, QualityProfileConfigOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => qualityProfileConfigSelector.getQualityProfileRules(state),
            languageTypes: (state) => qualityProfileConfigSelector.getLanguageTypes(state),
            qualityProfileInfo: (state) => qualityProfileConfigSelector.getQualityProfileInfo(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): QualityProfileConfigDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchFetchlanguageTypes: (errorCallback: (error?: any) => void) => dispatch(QualityProfileConfigActionCreator.fetchLanguageTypes(errorCallback)),

        dispatchQualityProfileInfo: (profileInfo: LanguageProfileMapModel) => dispatch(QualityProfileConfigActionCreator.setQualityProfileDetail(profileInfo)),

        dispatchprofileLanguage: (profilelanguage: number) => dispatch(QualityProfileConfigActionCreator.setProfileLanguage(profilelanguage)),

        dispatchSaveNewProfile: (profileSaveRequest: LanguageProfileMapModel, successCallback: (response) => void, errorCallback: (error) => void) =>
            dispatch(QualityProfileConfigActionCreator.saveProfileInfo(profileSaveRequest, successCallback, errorCallback)),

        dispatchFetchProfileBasedRules: (pageRequest: ProfileRulePageRequestModel, errorCallback: (error?: any) => void) =>
            dispatch(QualityProfileConfigActionCreator.fetchProfileBasedRules(pageRequest, errorCallback)),

        dispatchSaveUpdateProfileRules: (ruleUpdationRequest: RuleActivationRequestModel, successCallback: (response) => void, errorCallback: (error) => void) =>
            dispatch(QualityProfileConfigActionCreator.changeRuleActivation(ruleUpdationRequest, successCallback, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(QualityProfileConfigComponent);
export const QualityProfileConfigContainer = injectReducer(Constant.reducerKey.staticProfileConfigReducer, qualityProfileConfigReducer)(withConnect);
