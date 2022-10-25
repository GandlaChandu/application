//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';
import { SharedActionType, ScanCascadeFormActionType } from '../../shared';

import { ScanState } from './scan.state';

//#endregion application imports

const initialScanState: ScanState = new ScanState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function scanReducer(state: ScanState = initialScanState, action: IAppActionModel<ScanState>): ScanState {
    switch (action.type) {
        case SharedActionType.FetchClients:
            return {
                ...state,
                clients: action.payload.clients
            };
        case SharedActionType.FetchDivisions:
            return {
                ...state,
                divisions: action.payload.divisions
            }
        case SharedActionType.FetchProjects:
            return {
                ...state,
                projects: action.payload.projects
            }
        case SharedActionType.FetchScanTypes:
            return {
                ...state,
                scanTypes: action.payload.scanTypes
            }
        case ScanCascadeFormActionType.SetClientId:
            return {
                ...state,
                clientId: action.payload.clientId
            }
        case ScanCascadeFormActionType.SetDivisionId:
            return {
                ...state,
                divisionId: action.payload.divisionId
            }
        case ScanCascadeFormActionType.SetProjectId:
            return {
                ...state,
                projectId: action.payload.projectId
            }
        case ScanCascadeFormActionType.SetScanTypeId:
            return {
                ...state,
                scanTypeId: action.payload.scanTypeId
            }

        default:
            return state;
    }
}


