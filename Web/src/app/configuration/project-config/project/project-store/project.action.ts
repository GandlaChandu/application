//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { SharedActionCreator, KeyNamePairModel, Helper, PageState, ProjectModel, TicketModel, GitHubTicketConfigModel, StaticScanDetailModel, DynamicScanDetailModel } from '../../../../shared';
import { TicketSystemType, EntityType, Role } from '../../../../utilities';

import { ProjectState, ProjectActionType } from '../project-store';
import { projectService } from '../project.service';
import { ProjectFormModel } from '../project-form/models';
import { StaticScanInfoFormModel } from '../static-scan-info';
import { DynamicScanInfoFormModel } from '../dynamic-scan-info';
import { ProjectStaticScanTypeModel } from '../models';
import { dynamicPolicySectionService } from '../../../config-shared';
import { TicketingSystemInfoFormModel, TicketingSystemInfoActionCreator } from '../ticketing-system-info';

//#endregion application imports

export class ProjectActionCreator {

    //#region public functions    

    /**
     * action to set division control display state info to store
     * @param show
     */
    public static setShowDivisionControl(show: boolean = false): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            dispatch({
                type: ProjectActionType.ShowDivisionControl,
                payload: { showDivisionControl: show }
            });
        };
    }

    /**
     * action to set ticket system types and save info to store
     * @param errorCallback
     */
    public static fetchTicketSystemTypesTypes(errorCallback: (error?: any) => void): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            projectService.getTicketSystemTypes(dispatch).then((response: ApiResponseModel<any>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: ProjectActionType.FetchTicketSystemTypes,
                        payload: {
                            ticketingSystemTypes: response.data.map(x => Helper.toSelectListItem(x))
                        }
                    });
                }
                else {
                    errorCallback(response);
                }
            },
                errorCallback
            );

        }
    }

    /**
     * action to set ticket config display state info to store
     * @param ticketSystemType
     */
    public static setTicketSystemType(ticketSystemType: TicketSystemType): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            dispatch({
                type: ProjectActionType.CurrentTicketSystemType,
                payload: { selectedTicketingSystemType: ticketSystemType }
            });
        };
    }

    /**
     * action to set enterprise account display state info to store
     * @param enabled
     */
    public static setEnterpriseAccount(enabled: boolean): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            dispatch({
                type: ProjectActionType.EnterpriseAccountState,
                payload: { isEnterpriseAccount: enabled }
            });
        };
    }

    /**
     * action to set project details to store
     * @param projectId
     * @param errorCallback
     */
    public static fetchProjectDetail(projectId: number, errorCallback: (error?: any) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            if (projectId > 0) {
                let projectFormInfo: ProjectFormModel = new ProjectFormModel();
                projectService.getProject(projectId, dispatch).then(
                    (response: ApiResponseModel<ProjectModel>) => {
                        let project = response && response.isSuccess ? response.data : null;
                        if (project) {
                            projectFormInfo.clientId = project.clientId;
                            projectFormInfo.divisionId = project.divisionId;
                            projectFormInfo.projectId = project.id;
                            projectFormInfo.projectName = project.name;
                            projectFormInfo.isActive = project.isActive;
                            dispatch({
                                type: ProjectActionType.FetchProjectInfo,
                                payload: {
                                    projectInfo: projectFormInfo
                                }
                            });
                            dispatch(SharedActionCreator.fetchDivisions(project.clientId, errorCallback));
                            dispatch(ProjectActionCreator.setShowDivisionControl(true));
                        }
                        else {
                            errorCallback(response);
                        }
                    },
                    errorCallback
                );
            }
            else {
                dispatch({
                    type: ProjectActionType.FetchProjectInfo,
                    payload: {
                        projectInfo: new ProjectFormModel()
                    }
                });
                dispatch(ProjectActionCreator.setShowDivisionControl(false));
            }
        }
    }

    /**
     * action to set project details to store
     * @param projectInfo
     * @param errorCallback
     */
    public static setProject(projectInfo): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            dispatch({
                type: ProjectActionType.FetchProjectInfo,
                payload: {
                    projectInfo: projectInfo
                }
            });
        }
    }

    /**
     * action to save project info to store
     * @param projectRequest
     * @param successCallback
     * @param errorCallback
     */
    public static saveProjectInfo(projectRequest: ProjectModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            projectService.saveProject(projectRequest, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        successCallback(response)
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        };
    }

    /**
     * action to set ticket system details to store
     * @param projectId
     * @param errorCallback
     */
    public static fetchTicketSystemDetail(projectId: number, errorCallback: (error?: any) => void): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            if (projectId > 0) {
                let ticketSystemFormInfo: TicketingSystemInfoFormModel = new TicketingSystemInfoFormModel();
                projectService.getTicketSystemConfig(projectId, dispatch).then(
                    (ticketConfigResult: ApiResponseModel<any>) => {
                        let ticketConfigAnalysis = ticketConfigResult && ticketConfigResult.isSuccess && ticketConfigResult.data.length !== 0 ? ticketConfigResult.data : null;
                        if (ticketConfigResult.isSuccess && ticketConfigResult.data.length !== 0) {
                            ticketSystemFormInfo.id = ticketConfigAnalysis.id;
                            ticketSystemFormInfo.type = ticketConfigAnalysis.type;
                            this.mapTicketSystemConfigurationByType(ticketSystemFormInfo, ticketConfigAnalysis.configuration);
                            dispatch(TicketingSystemInfoActionCreator.setTokenState(ticketSystemFormInfo.isTokenBased));
                            dispatch(ProjectActionCreator.setEnterpriseAccount(ticketSystemFormInfo.isEnterpriseAccount));
                            dispatch(ProjectActionCreator.setTicketSystemType(ticketSystemFormInfo.type));
                            dispatch({
                                type: ProjectActionType.FetchTicketSystemInfo,
                                payload: {
                                    ticketSystemConfigInfo: ticketSystemFormInfo,
                                    showTicketForm: true
                                }
                            });
                        }
                    },
                    errorCallback
                );
            }
        }
    }

    /**
     * action to save ticketing system info to store
     * @param ticketSystemRequest
     * @param successCallback
     * @param errorCallback
     */
    public static saveTicketSystemInfo(ticketSystemRequest: TicketingSystemInfoFormModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            projectService.saveTicketSystemInfo(ticketSystemRequest, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        successCallback(response)
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        };
    }

    /**
    * action to set code analysis details to store
    * @param projectId
    * @param errorCallback
    */
    public static fetchCodeAnalysisDetail(projectId: number, errorCallback: (error?: any) => void): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            if (projectId > 0) {
                let codeAnalysisFormInfo: StaticScanInfoFormModel = new StaticScanInfoFormModel();
                projectService.getCodeAnalysis(projectId, dispatch).then(
                    (codeResult: ApiResponseModel<StaticScanDetailModel>) => {
                        let codeAnalysis = codeResult && codeResult.isSuccess ? codeResult.data : null;
                        if (codeResult.isSuccess) {
                            codeAnalysisFormInfo.staticScanId = codeAnalysis.id;
                            codeAnalysisFormInfo.codeOrCodeURL = codeAnalysis.codeOrCodeURL;
                            codeAnalysisFormInfo.staticScanUserName = codeAnalysis.userName;
                            codeAnalysisFormInfo.staticScanPassword = codeAnalysis.password;
                            codeAnalysisFormInfo.sourceCodeTypeId = codeAnalysis.sourceCodeType;
                            codeAnalysisFormInfo.sourceControlTypeId = codeAnalysis.sourceControlType;
                            codeAnalysisFormInfo.isTokenBased = codeAnalysis.isTokenBased;
                            codeAnalysisFormInfo.staticScanTypes = codeAnalysis.staticScanPreferences.map(x => x.staticScanTypeId);
                            dispatch({
                                type: ProjectActionType.FetchCodeAnalysisInfo,
                                payload: {
                                    codeAnalysisInfo: codeAnalysisFormInfo,
                                    showForm: true,
                                    staticIsTokenBased: codeAnalysis.isTokenBased
                                }
                            });
                        }
                    },
                    errorCallback
                );
            }
        }
    }

    /**
     * action to save static scan info to store
     * @param staticScanRequest
     * @param successCallback
     * @param errorCallback
     */
    public static saveCodeAnalysisInfo(staticScanRequest: StaticScanDetailModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            projectService.saveCodeAnalysisInfo(staticScanRequest, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        successCallback(response)
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        };
    }

    /**
     * action to set app analysis details to store
     * @param projectId
     * @param errorCallback
     */
    public static fetchAppAnalysisDetail(projectId: number, errorCallback: (error?: any) => void): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            if (projectId > 0) {
                let appAnalysisFormInfo: DynamicScanInfoFormModel = new DynamicScanInfoFormModel();
                dynamicPolicySectionService.getDynamicScanPolicyByEntityId(EntityType.Project, projectId, dispatch).then(
                    (scanPolicyResponse: ApiResponseModel<KeyNamePairModel[]>) => {
                        let policyResponse = scanPolicyResponse && scanPolicyResponse.isSuccess && scanPolicyResponse.data.length ? scanPolicyResponse.data[0] : null;
                        if (scanPolicyResponse.isSuccess && scanPolicyResponse.data.length > 0) {
                            if (scanPolicyResponse.data.length > 0) {
                                appAnalysisFormInfo.scanPolicyId = policyResponse.id;
                                appAnalysisFormInfo.hasStaticMapping = true;
                            }
                            dispatch({
                                type: ProjectActionType.FetchAppAnalysisInfo,
                                payload: {
                                    appAnalysisInfo: appAnalysisFormInfo,
                                    showDynamicForm: true
                                }
                            });
                        }
                    }
                );
                projectService.getAppAnalysis(projectId, dispatch).then(
                    (response: ApiResponseModel<DynamicScanDetailModel>) => {
                        let appAnalysis = response && response.isSuccess ? response.data : null;
                        if (appAnalysis) {
                            appAnalysisFormInfo.applicationURL = appAnalysis.applicationURL;
                            appAnalysisFormInfo.id = appAnalysis.id;
                            appAnalysisFormInfo.applicationURL = appAnalysis.applicationURL;
                            appAnalysisFormInfo.userName = appAnalysis.userName;
                            appAnalysisFormInfo.password = appAnalysis.password;
                            appAnalysisFormInfo.entityId = appAnalysis.projectId;
                            appAnalysisFormInfo.entityTypeId = EntityType.Project;
                            appAnalysisFormInfo.isTokenBased = appAnalysis.isTokenBased;
                            dispatch({
                                type: ProjectActionType.FetchAppAnalysisInfo,
                                payload: {
                                    appAnalysisInfo: appAnalysisFormInfo,
                                    showDynamicForm: true,
                                    dynamicIsTokenBased: appAnalysis.isTokenBased
                                }
                            });
                        }
                    },
                    errorCallback
                );
            }
        }
    }

    /**
     * action to save dynamic scan info to store
     * @param dynamicScanRequest
     * @param successCallback
     * @param errorCallback
     */
    public static saveAppAnalysisInfo(dynamicScanRequest: DynamicScanDetailModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            projectService.saveAppAnalysisInfo(dynamicScanRequest, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (response && response.isSuccess) {
                        successCallback(response)
                    }
                    else {
                        errorCallback(response);
                    }
                },
                errorCallback
            );
        };
    }

    /**
    * action to save project and static scan policy info to store
    * @param projectStaticScanRequest
    * @param errorCallback
    */
    public static saveProjectScanPolicyInfo(projectStaticScanRequest: ProjectStaticScanTypeModel, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            projectService.saveProjectScanPolicyInfo(projectStaticScanRequest, dispatch).then(
                (response: ApiResponseModel<any>) => {
                    if (!(response && response.isSuccess)) {
                        errorCallback(response);
                    }
                },
                errorCallback);
        };
    }

    //#endregion public functions

    //#region private functions

    /**
      * map ticket system configuration
      * @param ticketSystemFormInfo 
      * @param configuration 
      */
    private static mapTicketSystemConfigurationByType(ticketSystemFormInfo: TicketingSystemInfoFormModel, configuration: TicketModel) {
        switch (ticketSystemFormInfo.type) {
            case TicketSystemType.GitHub:
                this.mapGitHubTicketSystemConfiguration(ticketSystemFormInfo, configuration as GitHubTicketConfigModel);
                break;
            default:
                break;
        }
    }

    /**
     * map GitHub ticket system configuration
     * @param ticketSystemFormInfo 
     * @param configuration 
     */
    private static mapGitHubTicketSystemConfiguration(ticketSystemFormInfo: TicketingSystemInfoFormModel, configuration: GitHubTicketConfigModel) {
        ticketSystemFormInfo.isTokenBased = configuration.isTokenBased;
        ticketSystemFormInfo.username = configuration.username;
        ticketSystemFormInfo.password = configuration.password;
        ticketSystemFormInfo.owner = configuration.owner;
        ticketSystemFormInfo.repositoryName = configuration.name;
        ticketSystemFormInfo.isEnterpriseAccount = configuration.isEnterpriseAccount;
        ticketSystemFormInfo.enterpriseUrl = configuration.enterpriseUrl;
    }

    /**
     * action to set tab state info to store
     * @param tabeName
     */
    public static setShowTab(tabeName: string): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            dispatch({
                type: ProjectActionType.ShowTab,
                payload: { showTab: tabeName }
            });
        };
    }

    /**
     * action to set user map tab state info to store
     * @param show
     */
    public static setShowUserMapTab(show: boolean = false): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            dispatch({
                type: ProjectActionType.ShowUserMapTab,
                payload: { showUserTab: show }
            });
        };
    }

    /**
     * action to set role options state info to store
     * @param show
     */
    public static setRoleOptions(): ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>> {
        return (dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) => {
            dispatch({
                type: ProjectActionType.FetchRoleOptions,
                payload: {
                    roleOptions:
                        [
                            {
                                label: Role[Role.ProjectAdmin],
                                value: Role.ProjectAdmin
                            },
                            {
                                label: Role[Role.ProjectUser],
                                value: Role.ProjectUser
                            }
                        ]
                }
            });
        };
    }

    //#endregion private functions
}