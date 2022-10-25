//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../core';
import { containerHelper, injectReducer } from '../../../shared';
import { Constant } from '../../../utilities';

import { ProjectManagerComponent } from './project-manager.component';
import { ProjectManagerState, projectManagerSelector, ProjectManagerActionCreator, projectManagerReducer } from './project-manager-store';
import { ProjectManagerOwnPropModel, ProjectManagerRequestModel, ProjectManagerDispatchPropModel } from './models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state): Selector<ProjectManagerState, ProjectManagerOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => projectManagerSelector.getProjects(state),
            formData: (state) => projectManagerSelector.getFormData(state)
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<ProjectManagerState, any, IAppActionModel<ProjectManagerState>>): ProjectManagerDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchProjects: (pageRequest: ProjectManagerRequestModel, errorCallback: (error?: any) => void) =>
            dispatch(ProjectManagerActionCreator.fetchProjects(pageRequest, errorCallback))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ProjectManagerComponent);
export const ProjectManagerContainer = injectReducer(Constant.reducerKey.projectManagerReducer, projectManagerReducer)(withConnect);