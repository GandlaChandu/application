//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector, Selector } from 'reselect';

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';
import { containerHelper, ErrorFn } from '../../shared';

import { ProjectListSectionComponent } from './project-list-section.component';
import { DashboardState, DashboardActionCreator, dashboardSelector } from '../dashboard-store';
import { ProjectListSectionOwnPropModel, ProjectListSectionDispatchPropModel } from './models';
import { DashboardRequestModel } from '../models';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state: any, ownprops: ProjectListSectionOwnPropModel): Selector<any, ProjectListSectionOwnPropModel> {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            gridResultData: (state) => dashboardSelector.getProjects(state),
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<DashboardState, any, IAppActionModel<DashboardState>>): ProjectListSectionDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchProjects: (pageRequest: DashboardRequestModel, errorCallback: ErrorFn) =>
            dispatch(DashboardActionCreator.fetchProjects(pageRequest, errorCallback))
    };
}

export const ProjectListSectionContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectListSectionComponent);