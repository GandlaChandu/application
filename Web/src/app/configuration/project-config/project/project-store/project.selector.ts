//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';

import { ProjectState } from './project.state';

//#endregion application imports


class ProjectSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets client info
     * @param state
     */
    public getClients(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).clients : [],
            (clients) => clients
        );
        return selector(state);
    }

    /**
     * gets divisions for client
     * @param state
     */
    public getDivisions(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).divisions : [],
            (divisions) => divisions
        );
        return selector(state);
    }

    /**
     * gets ticket types info
     * @param state
     */
    public getTicketSystemTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).ticketingSystemTypes : [],
            (ticketSystemTypes) => ticketSystemTypes
        );
        return selector(state);
    }

    /**
     * gets display state for division control
     * @param state
     */
    public getDisplayDivisionState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).showDivisionControl : false,
            (showDivisionControl) => showDivisionControl
        );
        return selector(state);
    }

    /**
     * gets project info
     * @param state
     */
    public getProjectInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).projectInfo : null,
            (projectInfo) => projectInfo
        );
        return selector(state);
    }

    /**
     * gets code analysis info
     * @param state
     */
    public getCodeAnalysisInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).codeAnalysisInfo : null,
            (codeAnalysisInfo) => codeAnalysisInfo
        );
        return selector(state);
    }

    /**
     * gets app analysis info
     * @param state
     */
    public getAppAnalysisInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).appAnalysisInfo : null,
            (appAnalysisInfo) => appAnalysisInfo
        );
        return selector(state);
    }

    /**
     * gets ticket system configuration info
     * @param state
     */
    public getTicketSystemConfigInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).ticketSystemConfigInfo : null,
            (ticketSystemConfigInfo) => ticketSystemConfigInfo
        );
        return selector(state);
    }

    /**
     * Get ScanPolicies from ProjectState
     * @param state 
     */
    public getScanPolicies(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).scanPolicies : [],
            (scanPolicies) => scanPolicies
        );
        return selector(state);
    }

    /**
     * gets tab display state
     * @param state
     */
    public getTabState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).showTab : false,
            (showTab) => showTab
        );
        return selector(state);
    }

    /**
     * gets role options state
     * @param state
     */
    public getRoleOptions(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.projectReducer] ?
                (state[Constant.reducerKey.projectReducer] as ProjectState).roleOptions : [],
            (roleOptions) => roleOptions
        );
        return selector(state);
    }

    //#endregion public functions

}

export const projectSelector = new ProjectSelector();

