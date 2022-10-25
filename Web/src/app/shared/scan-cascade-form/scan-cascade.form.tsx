//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState } from '../../shared';
import { IAppActionModel } from '../../core';
import { ScanTypeEnum } from '../../utilities';

import { ScanCascadeFormDispatchPropModel, ScanCascadeFormPropModel } from './models';
import { ScanCascadeFormConstant } from './scan-cascade-form.constant';
import { ScanCascadeFormComponent } from './scan-cascade-form.component';
import { SharedActionCreator } from '../actions';
import { scanSelector, ScanCascadeFormActionCreator } from './scan-cascade-form-store';
import { containerHelper } from '../helpers';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state, ownProps: ScanCascadeFormPropModel) {
    return createStructuredSelector(
        {
            clients: (state, ownProps) => scanSelector.getClients(state, ownProps),
            divisions: (state, ownProps) => scanSelector.getDivisions(state, ownProps),
            projects: (state, ownProps) => scanSelector.getProjects(state, ownProps),
            scanTypes: (state, ownProps) => scanSelector.getScanTypes(state, ownProps),
            //initialValues: (state, ownprops) => scanSelector.getFormData(state, ownprops),
            formData: (state, ownprops) => scanSelector.getFormData(state, ownprops),
            scanFormData: (state, ownprops) => scanSelector.getScanFormData(state, ownprops)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): ScanCascadeFormDispatchPropModel {
    return {

        ...containerHelper().mapDispatchToPropsBase(dispatch),

        dispatchFetchClients: (errorCallback: (error?: any) => void) =>
            dispatch(SharedActionCreator.fetchClients(errorCallback)),

        dispatchFetchDivisions: (id: number, errorCallback: (error?: any) => void) =>
            dispatch(SharedActionCreator.fetchDivisions(id, errorCallback)),

        dispatchFetchProjects: (id: number, errorCallback: (error?: any) => void, scanType?: ScanTypeEnum) =>
            dispatch(SharedActionCreator.fetchProjects(id, errorCallback, scanType)),

        dispatchFetchScanTypes: (errorCallback: (error?: any) => void) =>
            dispatch(SharedActionCreator.fetchScanTypes(errorCallback)),

        dispatchSetClientId: (id: number) =>
            dispatch(ScanCascadeFormActionCreator.setClientId(id)),

        dispatchSetProjectId: (id: number) =>
            dispatch(ScanCascadeFormActionCreator.setProjectId(id)),

        dispatchSetDivisionId: (id: number) =>
            dispatch(ScanCascadeFormActionCreator.setDivisonId(id)),

        dispatchSetScanTypeId: (id: number) =>
            dispatch(ScanCascadeFormActionCreator.setScanTypeId(id))
    };
}

const ScanCascadeReduxform = reduxForm<any, any>({
    form: ScanCascadeFormConstant.form,
    enableReinitialize: true,
})(ScanCascadeFormComponent)

const ScanCascadeEmptyReduxForm = reduxForm<any, any>({})(ScanCascadeFormComponent);

export const ScanCascadeForm = connect(mapStateToProps, mapDispatchToProps)(ScanCascadeReduxform);
export const ScanCascadeExcludeForm = connect(mapStateToProps, mapDispatchToProps)(ScanCascadeEmptyReduxForm);