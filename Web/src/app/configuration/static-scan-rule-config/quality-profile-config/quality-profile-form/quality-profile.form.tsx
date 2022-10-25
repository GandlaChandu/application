//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState } from '../../../../shared';
import { IAppActionModel } from '../../../../core';

import { QualityProfileFormDispatchPropModel, QualityProfileFormOwnPropModel } from './models';
import { QualityProfileConfigState, qualityProfileConfigSelector } from '../quality-profile-config-store';
import { QualityProfileFormConstant } from './quality-profile-form.constant';
import { QualityProfileFormComponent } from './quality-profile-form.component';


//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<QualityProfileConfigState, QualityProfileFormOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            languageTypes: (state) => qualityProfileConfigSelector.getLanguageTypes(state),
            initialValues: (state) => qualityProfileConfigSelector.getQualityProfileInfo(state),
            profileLanguage: (state) => qualityProfileConfigSelector.getProfileLanguage(state),
            qualityProfileInfo: (state) => qualityProfileConfigSelector.getQualityProfileInfo(state),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): QualityProfileFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch)
    };
}

const QualityProfileReduxform = reduxForm<any, any>({
    form: QualityProfileFormConstant.form,
    enableReinitialize: true,
})(QualityProfileFormComponent)

export const QualityProfileform = connect(mapStateToProps, mapDispatchToProps)(QualityProfileReduxform)