//#region react imports

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createStructuredSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { containerHelper, GlobalState, injectReducer, SharedActionCreator, ProjectModel, StaticScanDetailModel, DynamicScanDetailModel } from '../../../shared';
import { IAppActionModel } from '../../../core';
import { Constant } from '../../../utilities';

import { ProjectActionCreator, projectReducer, projectSelector } from './project-store';
import { ProjectComponent } from './project.component';
import { ProjectDispatchPropModel, ProjectStaticScanTypeModel } from './models';
import { TicketingSystemInfoFormModel } from './ticketing-system-info';
import { userMapSelector } from '../../config-shared';

//#endregion application imports

/**
 * maps state to component props
 * @param state
 */
function mapStateToProps(state) {
    return createStructuredSelector(
        {
            ...containerHelper().mapStateToPropsBase(state),
            showTab: (state) => projectSelector.getTabState(state),
            projectInfo: (state) => projectSelector.getProjectInfo(state),
            appAnalysisInfo: (state) => projectSelector.getAppAnalysisInfo(state),
            roleOptions: (state) => projectSelector.getRoleOptions(state),
            showUserTab: (state) => userMapSelector.getUserTabState(state, { namespace: Constant.reducerKey.projectReducer })
        }
    );
}

/**
 * maps action creater to props
 * @param dispatch
 */
function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, any, IAppActionModel<GlobalState>>): ProjectDispatchPropModel {
    return {
        ...containerHelper().mapDispatchToPropsBase(dispatch),
        dispatchFetchClients: (errorCallback: (error?: any) => void) =>
            dispatch(SharedActionCreator.fetchClients(errorCallback)),

        dispatchFetchDivisions: (clientId: number, errorCallback: (error?: any) => void) =>
            dispatch(SharedActionCreator.fetchDivisions(clientId, errorCallback)),

        dispatchFetchTicketSystemTypes: (errorCallback: (error?: any) => void) =>
            dispatch(ProjectActionCreator.fetchTicketSystemTypesTypes(errorCallback)),

        dispatchFetchProjectInfo: (projectId: number, errorCallback: (error?: any) => void) =>
            dispatch(ProjectActionCreator.fetchProjectDetail(projectId, errorCallback)),

        dispatchSaveProject: (projectRequest: ProjectModel, successCallback: (response) => void, errorCallback: (error) => void) =>
            dispatch(ProjectActionCreator.saveProjectInfo(projectRequest, successCallback, errorCallback)),

        dispacthTabState: (tabeName: string) =>
            dispatch(ProjectActionCreator.setShowTab(tabeName)),

        dispatchFetchTicketingSystemInfo: (projectId: number, errorCallback: (error?: any) => void) =>
            dispatch(ProjectActionCreator.fetchTicketSystemDetail(projectId, errorCallback)),

        dispatchSaveTicketSystemInfo: (ticketSystemRequest: TicketingSystemInfoFormModel, successCallback: (response) => void, errorCallback: (error) => void) =>
            dispatch(ProjectActionCreator.saveTicketSystemInfo(ticketSystemRequest, successCallback, errorCallback)),

        dispatchFetchCodeAnalysisInfo: (projectId: number, errorCallback: (error?: any) => void) =>
            dispatch(ProjectActionCreator.fetchCodeAnalysisDetail(projectId, errorCallback)),

        dispatchSaveCodeAnalysis: (staticScanRequest: StaticScanDetailModel, successCallback: (response) => void, errorCallback: (error) => void) =>
            dispatch(ProjectActionCreator.saveCodeAnalysisInfo(staticScanRequest, successCallback, errorCallback)),

        dispatchFetchAppAnalysisInfo: (projectId: number, errorCallback: (error?: any) => void) =>
            dispatch(ProjectActionCreator.fetchAppAnalysisDetail(projectId, errorCallback)),

        dispatchSaveAppAnalysis: (dynamicScanRequest: DynamicScanDetailModel, successCallback: (response) => void, errorCallback: (error) => void) =>
            dispatch(ProjectActionCreator.saveAppAnalysisInfo(dynamicScanRequest, successCallback, errorCallback)),

        dispatchSaveScanPolicy: (projectStaticScanRequest: ProjectStaticScanTypeModel, errorCallback: (error) => void) =>
            dispatch(ProjectActionCreator.saveProjectScanPolicyInfo(projectStaticScanRequest, errorCallback)),

        dispatchUserMapTabState: (show: boolean) => dispatch(ProjectActionCreator.setShowUserMapTab(show)),

        dispatchFetchRoleOptions: () => dispatch(ProjectActionCreator.setRoleOptions()),

        dispatchSetProject: (projectInfo) => dispatch(ProjectActionCreator.setProject(projectInfo))

    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);
export const ProjectContainer = injectReducer(Constant.reducerKey.projectReducer, projectReducer)(withConnect);
