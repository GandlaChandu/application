//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';
import { SharedActionType, ScanCascadeFormActionType } from '../../../../shared';

import { ScheduleState } from './schedule.state';
import { ScheduleActionType } from './schedule-action-type.enum';

//#endregion application imports

const initialScheduleState: ScheduleState = new ScheduleState();

/**
 * schedule actions reducer
 * @param state
 * @param action
 */
export function scheduleReducer(state: ScheduleState = initialScheduleState, action: IAppActionModel<ScheduleState>): ScheduleState {
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

        case ScheduleActionType.SetSchedule:
            return {
                ...state,
                clientId: action.payload.clientId,
                divisionId: action.payload.divisionId,
                projectId: action.payload.projectId,
                scanTypeId: action.payload.scanTypeId,
                scheduleInfo: action.payload.scheduleInfo,
                cronValue: action.payload?.scheduleInfo.schedule?.cronSchedule,
                initialScheduleInfo: action.payload.initialScheduleInfo ? action.payload.initialScheduleInfo : { ...state.initialScheduleInfo }
            }

        case ScheduleActionType.SetConfigState:
            return {
                ...state,
                showConfig: action.payload.showConfig
            }
        case ScheduleActionType.SetCronValue:
            return {
                ...state,
                cronValue: action.payload.cronValue
            }
        default:
            return state;
    }
}


