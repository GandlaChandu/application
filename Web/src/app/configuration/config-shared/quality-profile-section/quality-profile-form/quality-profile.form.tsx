//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';
import { containerHelper } from '../../../../shared';

import { QualityProfileFormComponent } from './quality-profile-form.component';
import { QualityProfileFormConstant } from './quality-profile-form.constant';
import { QualityProfileFormDispatchPropModel } from './models/quality-profile-form-dispatch-prop.model';
import { QualityProfileSectionState, QualityProfileSectionActionCreator, qualityProfileSectionSelector } from '../quality-profile-store';
import { QualityProfileFormOwnPropModel } from './models/quality-profile-own-prop.model';
import { QualityProfileFormModel } from '../quality-profile-form';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 * @param ownprops
 */
function mapStateToProps(state, ownprops): Selector<any, QualityProfileFormOwnPropModel | any> {
    return createStructuredSelector(
        {
            languages: (state) => qualityProfileSectionSelector.getLanguages(state, ownprops),
            initialValues: (state) => qualityProfileSectionSelector.getInitialProfile(state, ownprops),
            languageProfiles: (state) => qualityProfileSectionSelector.getLanguageProfiles(state, ownprops),
            selectedProfile: (state) => qualityProfileSectionSelector.getSelectedProfile(state, ownprops)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<QualityProfileSectionState, any, IAppActionModel<QualityProfileSectionState>>): QualityProfileFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchLanguages: (errorCallback: (error?: any) => void) =>
            dispatch(QualityProfileSectionActionCreator.fetchLanguages(errorCallback)),

        dispatchFetchLanguageProfiles: (languageId: number, errorCallback: (error?: any) => void) =>
            dispatch(QualityProfileSectionActionCreator.fetchLanguageProfiles(languageId, errorCallback)),

        dispatchSetSelectedInfo: (profile: QualityProfileFormModel) =>
            dispatch(QualityProfileSectionActionCreator.setSelectedProfileInfo(profile))
    };
}

const QualityProfileReduxform = reduxForm({
    form: QualityProfileFormConstant.form,
    enableReinitialize: true
})(QualityProfileFormComponent)

export const QualityProfileForm = connect(mapStateToProps, mapDispatchToProps)(QualityProfileReduxform)