//#region react imports

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector, Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { GlobalState, SharedActionCreator, containerHelper } from '../../../../shared';
import { IAppActionModel } from '../../../../core';

import { projectSelector, ProjectActionCreator } from '../project-store';
import { ProjectFormComponent } from './project-form.component';
import { ProjectFormConstant } from './project-form.constant';
import { ProjectFormDispatchPropModel, ProjectFormOwnPropModel } from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<any, ProjectFormOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            clients: (state) => projectSelector.getClients(state),
            divisions: (state) => projectSelector.getDivisions(state),
            showDivisionControl: (state) => projectSelector.getDisplayDivisionState(state),
            initialValues: (state) => projectSelector.getProjectInfo(state),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): ProjectFormDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchDivisions: (clientId: number, errorCallback: (error?: any) => void) => dispatch(SharedActionCreator.fetchDivisions(clientId, errorCallback)),
        dispatchShowDivision: (show: boolean) => dispatch(ProjectActionCreator.setShowDivisionControl(show)),
    };
}

const ProjectReduxform = reduxForm<any, any>({
    form: ProjectFormConstant.form,
    enableReinitialize: true,
})(ProjectFormComponent)

export const ProjectForm = connect(mapStateToProps, mapDispatchToProps)(ProjectReduxform)