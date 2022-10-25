//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, containerHelper } from '../../../../shared';
import { IAppActionModel } from '../../../../core';

import { DynamicScanInfoFormComponent } from './dynamic-scan-info-form.component';
import { DynamicScanInfoFormDispatchPropModel } from './models/dynamic-scan-info-form-dispatch-prop.model';
import { dynamicScanInfoSelector, DynamicScanInfoActionCreator } from './dynamic-scan-info-store';
import { DynamicScanInfoFormOwnPropModel } from './models/dynamic-scan-info-own-prop.model';
import { DynamicScanInfoFormConstant } from './dynamic-scan-info-form.constant';
import { projectSelector } from '../project-store';
import {DynamicScanInfoFormModel} from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, DynamicScanInfoFormOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            initialValues: (state) => projectSelector.getAppAnalysisInfo(state),
            appAnalysisInfo: (state) => projectSelector.getAppAnalysisInfo(state),
            showDynamicForm: (state) => dynamicScanInfoSelector.getDynamicFormState(state),
            dynamicIsTokenBased: (state) => dynamicScanInfoSelector.getTokenBasedState(state)

        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): DynamicScanInfoFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchShowDynamicForm: (showForm: boolean) => dispatch(DynamicScanInfoActionCreator.setDynamicFormState(showForm)),
        dispatchRemoveAppMapping: (dynamicScanDetails: DynamicScanInfoFormModel, successCallback: (response) => void, errorCallback: (error?: any) => void) =>
            dispatch(DynamicScanInfoActionCreator.removeAppMapping(dynamicScanDetails, successCallback, errorCallback)),
        dispatchTokenBasedState: (enabled: boolean) => dispatch(DynamicScanInfoActionCreator.setTokenState(enabled)),

    };
}

const DynamicScanInfoReduxform = reduxForm<any, any>({
    form: DynamicScanInfoFormConstant.form,
    enableReinitialize: true
})(DynamicScanInfoFormComponent)

export const DynamicScanInfoForm = connect(mapStateToProps, mapDispatchToProps)(DynamicScanInfoReduxform)