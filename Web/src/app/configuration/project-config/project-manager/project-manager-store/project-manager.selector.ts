//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { PagedResult, ProjectModel } from '../../../../shared';

import { ProjectManagerState } from './project-manager.state';
import { ProjectFilterFormModel } from '../models';
import { ProjectFilterConstant } from '../project-filter/project-filter.constant';

//#endregion application imports


class ProjectManagerSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets projects from state
     * @param state
     */
    public getProjects(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectManagerReducer] ?
                (state[Constant.reducerKey.projectManagerReducer] as ProjectManagerState).projects : new PagedResult<ProjectModel>(),
            (projects) => projects
        );
        return selector(state);
    }

    /**
     * gets clients from state
     * @param state
     */
    public getClients(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectManagerReducer] ?
                (state[Constant.reducerKey.projectManagerReducer] as ProjectManagerState).clients : [],
            (clients) => clients
        );
        return selector(state);
    }

    /**
     * gets divisions from state
     * @param state
     */
    public getDivisions(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectManagerReducer] ?
                (state[Constant.reducerKey.projectManagerReducer] as ProjectManagerState).divisions : [],
            (divisions) => divisions
        );
        return selector(state);
    }

    /**
     * gets show division value from state
     * @param state
     */
    public getShowDivisionInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectManagerReducer] ?
                (state[Constant.reducerKey.projectManagerReducer] as ProjectManagerState).showDivision : false,
            (showDivision) => showDivision
        );
        return selector(state);
    }

    /**
     * gets form data value from state
     * @param state
     */
    public getFormData(state: any) {
        let selector = createSelector(
            (state: any) => state.form && state.form[ProjectFilterConstant.form] ?
                (state.form[ProjectFilterConstant.form].values as ProjectFilterFormModel) || {} : {},
            (formData) => formData
        );
        return selector(state);
    }

}

export const projectManagerSelector = new ProjectManagerSelector();

