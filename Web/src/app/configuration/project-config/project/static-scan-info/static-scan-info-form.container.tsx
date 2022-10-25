//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, containerHelper } from '../../../../shared';
import { IAppActionModel } from '../../../../core';
import { Constant } from '../../../../utilities';

import { StaticScanInfoFormComponent } from './static-scan-info-form.component';
import { StaticScanInfoFormDispatchPropModel } from './models/static-scan-info-form-dispatch-prop.model';
import { staticScanInfoSelector, StaticScanInfoActionCreator } from './static-scan-info-store';
import { StaticScanInfoFormOwnPropModel } from './models/static-scan-info-own-prop.model';
import { qualityProfileSectionSelector } from '../../../config-shared';
import { projectSelector } from '../project-store';
import { StaticScanInfoFormConstant } from './static-scan-info-form.constant';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, StaticScanInfoFormOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            initialValues: (state) => projectSelector.getCodeAnalysisInfo(state),
            codeScanTypes: (state) => staticScanInfoSelector.getStaticCodeScanTypes(state),
            sourceCodeTypes: (state) => staticScanInfoSelector.getSourceCodeTypes(state),
            sourceControlTypes: (state) => staticScanInfoSelector.getSourceControlTypes(state),
            showCodeAnalysisDiv: (state) => staticScanInfoSelector.getDisplayCodeAnalysisState(state),
            showQualityProfileTab: (state) => qualityProfileSectionSelector.getQualityProfileTabState(state, { namespace: Constant.reducerKey.projectReducer }),
            showForm: (state) => staticScanInfoSelector.getFormState(state),
            codeAnalysisInfo: (state) => projectSelector.getCodeAnalysisInfo(state),
            staticIsTokenBased: (state) => staticScanInfoSelector.getTokenBasedState(state)

        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): StaticScanInfoFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchScanTypes: (errorCallback: (error?: any) => void) => dispatch(StaticScanInfoActionCreator.fetchCodeScanTypes(errorCallback)),
        dispatchFetchSourceCodeTypes: (errorCallback: (error?: any) => void) => dispatch(StaticScanInfoActionCreator.fetchSourceCodeTypes(errorCallback)),
        dispatchFetchSourceControlTypes: (errorCallback: (error?: any) => void) => dispatch(StaticScanInfoActionCreator.fetchSourceControlTypes(errorCallback)),
        dispacthQualityProfileTabState: (show: boolean) => dispatch(StaticScanInfoActionCreator.setShowQualityProfileTab(show)),
        dispatchShowForm: (showForm: boolean) => dispatch(StaticScanInfoActionCreator.setFormState(showForm)),
        dispatchRemoveCodeMapping: (staticScanId: number, successCallback: (response) => void, errorCallback: (error?: any) => void) =>
            dispatch(StaticScanInfoActionCreator.removeCodeMapping(staticScanId, successCallback, errorCallback)),
        dispatchTokenBasedState: (enabled: boolean) => dispatch(StaticScanInfoActionCreator.setTokenState(enabled)),

    };
}

const StaticScanInfoReduxform = reduxForm<any, any>({
    form: StaticScanInfoFormConstant.form,
    enableReinitialize: true
})(StaticScanInfoFormComponent);

export const StaticScanInfoForm = connect(mapStateToProps, mapDispatchToProps)(StaticScanInfoReduxform)