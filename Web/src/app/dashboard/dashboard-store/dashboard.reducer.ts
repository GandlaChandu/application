//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../core';
import { SharedActionType, ScanCascadeFormActionType } from '../../shared';

import { DashboardState } from './dashboard.state';
import { DashboardActionType } from './dashboard-action-type.enum';

//#endregion application imports

const initialDashboardState: DashboardState = new DashboardState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function dashboardReducer(state: DashboardState = initialDashboardState, action: IAppActionModel<DashboardState>): DashboardState {
    switch (action.type) {
        case DashboardActionType.FetchRecentScans:
            return {
                ...state,
                recentScans: action.payload.recentScans
            };
        case DashboardActionType.FetchScanSummary:
            return {
                ...state,
                scanSummary: action.payload.scanSummary
            };
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
        case DashboardActionType.FetchulnerabilitiesBySeverity:
            return {
                ...state,
                vulnerabilitiesBySeverity: action.payload.vulnerabilitiesBySeverity
            }
        case DashboardActionType.FetchLastScannedOn:
            return {
                ...state,
                lastScannedOn: action.payload.lastScannedOn
            }
        case DashboardActionType.FetchTopVulnerabilityTypes:
            return {
                ...state,
                topVulnerabilityTypes: action.payload.topVulnerabilityTypes
            }
        case DashboardActionType.FetchVulnerabilityTrend:
            return {
                ...state,
                vulnerabilityTrend: action.payload.vulnerabilityTrend
            }
        case DashboardActionType.FetchTrendPeriod:
            return {
                ...state,
                trendPeriod: action.payload.trendPeriod
            }
        case DashboardActionType.SetFiltersInfo:
            return {
                ...state,
                filtersInfo: action.payload.filtersInfo
            }
        case DashboardActionType.SetFilterState:
            return {
                ...state,
                isFilterOpen: action.payload.isFilterOpen
            }
        case DashboardActionType.FetchProjects:
            return {
                ...state,
                projectList: action.payload.projectList
            }
        default:
            return state;
    }
}


