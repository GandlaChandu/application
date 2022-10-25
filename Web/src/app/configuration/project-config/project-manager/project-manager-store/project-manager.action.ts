//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { PagedResult, ClientModel, DivisionModel, GlobalState, ProjectModel } from '../../../../shared';
import { IAppActionModel, ApiResponseModel, CoreActionCreator } from '../../../../core';

import { ProjectManagerActionType } from './project-manager-action-type.enum';
import { projectManagerService } from '../project-manager.service';
import { ProjectManagerState } from './project-manager.state';
import { ProjectManagerRequestModel } from '../models/project-manager-request.model';

//#endregion application imports

export class ProjectManagerActionCreator {

    //#region public functions

    /**
     * action to set page title state info to store
     * @param request
     * @param errorCallback
     */
    public static fetchProjects(request: ProjectManagerRequestModel, errorCallback: (error?: any) => void): ThunkDispatch<ProjectManagerState, any, IAppActionModel<ProjectManagerState>> {
        return (dispatch: ThunkDispatch<ProjectManagerState, any, IAppActionModel<ProjectManagerState>>) => {
            projectManagerService.getProjects(request, dispatch).then((response: ApiResponseModel<PagedResult<ProjectModel>>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: ProjectManagerActionType.FetchProject,
                        payload: { projects: response.data }
                    });
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
     * action to set clients to store
     */
    public static fetchClients(): ThunkDispatch<ProjectManagerState | GlobalState, any, IAppActionModel<ProjectManagerState | GlobalState>> {
        return (dispatch: ThunkDispatch<ProjectManagerState | GlobalState, any, IAppActionModel<ProjectManagerState | GlobalState>>) => {
            projectManagerService.getClients({}, dispatch).then(
                (response: ApiResponseModel<ClientModel[]>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: ProjectManagerActionType.FetchClient,
                            payload: {
                                clients: response.data.map(x => {
                                    return {
                                        value: x.id,
                                        label: x.name
                                    }
                                })
                            }
                        });
                    }
                    else {
                        dispatch(CoreActionCreator.setErrorAction({ isGlobalError: true, errorCode: response.status }));
                    }
                },
                (error: ApiResponseModel<ClientModel[]>) => {
                    dispatch(CoreActionCreator.setErrorAction(
                        {
                            isGlobalError: true,
                            errorCode: error.status
                        }
                    ))
                }
            );
        }
    }

    /**
     * action to set divisions to store
     * @param clientId
     */
    public static fetchDivisions(clientId: number): ThunkDispatch<ProjectManagerState, any, IAppActionModel<ProjectManagerState>> {
        return (dispatch: ThunkDispatch<ProjectManagerState, any, IAppActionModel<ProjectManagerState>>) => {
            if (clientId > 0) {
                projectManagerService.getDivisions(clientId, {}, dispatch).then(
                    (response: ApiResponseModel<DivisionModel[]>) => {
                        if (response && response.isSuccess) {
                            dispatch({
                                type: ProjectManagerActionType.FetchDivision,
                                payload: {
                                    divisions: response.data.map(x => {
                                        return {
                                            value: x.id,
                                            label: x.name
                                        }
                                    })
                                }
                            });
                        }
                        else {
                            dispatch(CoreActionCreator.setErrorAction({ isGlobalError: true, errorCode: response.status }));
                        }
                    },
                    (error: ApiResponseModel<DivisionModel[]>) => dispatch(CoreActionCreator.setErrorAction(
                        {
                            isGlobalError: true,
                            errorCode: error.status
                        }
                    ))
                );
            }
            else {
                dispatch({
                    type: ProjectManagerActionType.FetchDivision,
                    payload: {
                        divisions: []
                    }
                });
            }
           
        }
    }

    /**
     * action to show divisions to store
     * @param show
     */
    public static showDivision(show: boolean): ThunkDispatch<ProjectManagerState, any, IAppActionModel<ProjectManagerState>> {
        return (dispatch: ThunkDispatch<ProjectManagerState, any, IAppActionModel<ProjectManagerState>>) => {
            dispatch({
                type: ProjectManagerActionType.ShowDivision,
                payload: { showDivision: show }
            });
        };
    }

    //#endregion public functions
}