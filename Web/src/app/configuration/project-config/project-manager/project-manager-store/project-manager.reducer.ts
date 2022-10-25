//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { ProjectManagerState } from './project-manager.state';
import { ProjectManagerActionType } from './project-manager-action-type.enum';

//#endregion application imports

const initialProjectManagerState: ProjectManagerState = new ProjectManagerState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function projectManagerReducer(state: ProjectManagerState = initialProjectManagerState, action: IAppActionModel<ProjectManagerState>): ProjectManagerState {
    switch (action.type) {
        case ProjectManagerActionType.FetchProject:
            return {
                ...state,
                projects: action.payload.projects
            };
        case ProjectManagerActionType.FetchClient:
            return {
                ...state,
                clients: action.payload.clients
            };
        case ProjectManagerActionType.FetchDivision:
            return {
                ...state,
                divisions: action.payload.divisions
            };
        case ProjectManagerActionType.ShowDivision:
            return {
                ...state,
                showDivision: action.payload.showDivision
            };
        default:
            return state;
    }
}


