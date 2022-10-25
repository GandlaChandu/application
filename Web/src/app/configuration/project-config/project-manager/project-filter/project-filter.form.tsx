//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';
import { reduxForm } from 'redux-form';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';
import { SharedActionCreator } from '../../../../shared';

import { ProjectFilterOwnPropModel, ProjectFilterDispatchPropModel } from './models';
import { ProjectFilterFormComponent } from './project-filter-form.component';
import { ProjectFilterConstant } from './project-filter.constant';
import { ProjectManagerState, projectManagerSelector, ProjectManagerActionCreator } from '../project-manager-store';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<ProjectManagerState, ProjectFilterOwnPropModel> {
    return createStructuredSelector(
        {
            clients: (state) => projectManagerSelector.getClients(state),
            divisions: (state) => projectManagerSelector.getDivisions(state),
            showDivision: (state) => projectManagerSelector.getShowDivisionInfo(state),
            formData: (state) => projectManagerSelector.getFormData(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<ProjectManagerState, any, IAppActionModel<ProjectManagerState>>): ProjectFilterDispatchPropModel {
    return {
        dispatchFetchClients: () => dispatch(ProjectManagerActionCreator.fetchClients()),
        dispatchFetchDivisions: (clientId: number) => dispatch(ProjectManagerActionCreator.fetchDivisions(clientId)),
        dispatchShowDivision: (show: boolean) => dispatch(ProjectManagerActionCreator.showDivision(show)),
        dispatchResetControl: (formModel: any, form: string, fieldKey: string) =>
            dispatch(SharedActionCreator.resetControl(formModel, form, fieldKey))
    };
}

const ProjectReduxform = reduxForm({
    form: ProjectFilterConstant.form,
    enableReinitialize: true
})(ProjectFilterFormComponent)

export const ProjectFilterForm:any = connect(mapStateToProps, mapDispatchToProps)(ProjectReduxform)