//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { apiHandler, IAppActionModel } from '../../../core';
import { Url } from '../../../utilities';
import { ProjectModel, StaticScanDetailModel, DynamicScanDetailModel, Helper } from '../../../shared';

import { ProjectState } from './project-store';
import { ProjectStaticScanTypeModel } from './models';
import { TicketingSystemInfoFormModel } from './ticketing-system-info';

//#endregion application imports

class ProjectService {

    //#region public functions

    /**
     * get project by id
     * @param projectId
     * @param dispatch
     */
    public getProject(projectId: number, dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) {
        let url = Url.getApplicationAnalyzerUrl(`${Url.apiUrl.getProject}/${projectId}`);
        return apiHandler.get(url, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * save project
     * @param dispatch
     */
    public saveProject(data: ProjectModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        if (data.id) {
            return apiHandler.put(Url.getApplicationAnalyzerUrl(Url.apiUrl.updateProjectApi), data, dispatch, Helper.setHeaderAuthToken());
        } else {
            return apiHandler.post(Url.getApplicationAnalyzerUrl(Url.apiUrl.saveProjectApi), data, dispatch, Helper.setHeaderAuthToken());
        }

    }

    /**
    * get ticket system configuration
    * @param dispatch
    */
    public getTicketSystemConfig(projectId: number, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getTicketSystemUrl(`${Url.apiUrl.getTicketSystemConfigApi}/${projectId}`), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * save project and static scan mapping info
     * @param dispatch
     */
    public saveTicketSystemInfo(data: TicketingSystemInfoFormModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        if (data.id) {
            return apiHandler.put(Url.getTicketSystemUrl(Url.apiUrl.updateTicketSystemConfigApi), data, dispatch, Helper.setHeaderAuthToken());
        } else {
            return apiHandler.post(Url.getTicketSystemUrl(Url.apiUrl.saveTicketSystemConfigApi), data, dispatch, Helper.setHeaderAuthToken());
        }
    }

    /**
     * get code Analysis by project id
     * @param projectId
     * @param dispatch
     */
    public getCodeAnalysis(projectId: number, dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) {
        let url = Url.getStaticScanUrl(`${Url.apiUrl.getCodeAnalysis}/${projectId}`);
        return apiHandler.get(url, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * save code Analysis info
     * @param dispatch
     */
    public saveCodeAnalysisInfo(data: StaticScanDetailModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        if (data.id) {
            return apiHandler.put(Url.getStaticScanUrl(Url.apiUrl.updateCodeAnalysisApi), data, dispatch, Helper.setHeaderAuthToken());
        } else {
            return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.saveCodeAnalysisApi), data, dispatch, Helper.setHeaderAuthToken());
        }
    }

    /**
     * get app Analysis by project id
     * @param projectId
     * @param dispatch
     */
    public getAppAnalysis(projectId: number, dispatch: ThunkDispatch<ProjectState, any, IAppActionModel<ProjectState>>) {
        let url = Url.getDynamicScanUrl(`${Url.apiUrl.getAppAnalysis}/${projectId}`);
        return apiHandler.get(url, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * save app Analysis info
     * @param dispatch
     */
    public saveAppAnalysisInfo(data: DynamicScanDetailModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        if (data.id) {
            return apiHandler.put(Url.getDynamicScanUrl(Url.apiUrl.updateAppAnalysisApi), data, dispatch, Helper.setHeaderAuthToken());
        } else {
            return apiHandler.post(Url.getDynamicScanUrl(Url.apiUrl.saveAppAnalysisApi), data, dispatch, Helper.setHeaderAuthToken());
        }

    }

    /**
     * save project and static scan policy mapping info
     * @param dispatch
     */
    public saveProjectScanPolicyInfo(data: ProjectStaticScanTypeModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        if (data.hasStaticMapping) {
            return apiHandler.put(Url.getDynamicScanUrl(Url.apiUrl.dynamicUpdateScanPolicyMappingApi), data, dispatch, Helper.setHeaderAuthToken());
        } else {
            return apiHandler.post(Url.getDynamicScanUrl(Url.apiUrl.dynamicSaveScanPolicyMappingApi), data, dispatch, Helper.setHeaderAuthToken());
        }

    }

    /**
     * get ticket system types
     * @param dispatch
     */
    public getTicketSystemTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getApplicationAnalyzerUrl(Url.apiUrl.getTicketSystemTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const projectService = new ProjectService();