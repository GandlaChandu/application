//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';
import { SharedActionType, PermissionActionType } from '../../../../shared';

import { ProjectState } from './project.state';
import { ProjectActionType } from './project-action-type.enum';
import { StaticScanInfoActionType } from '../static-scan-info';
import { DynamicPolicySectionActionType, QualityProfileSectionActionType, UserMapSectionActionType } from '../../../config-shared';
import { DynamicScanInfoActionType } from '../dynamic-scan-info';
import { TicketingSystemInfoActionType } from '../ticketing-system-info';

//#endregion application imports

const initialProjectState: ProjectState = new ProjectState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function projectReducer(state: ProjectState = initialProjectState, action: IAppActionModel<ProjectState>): ProjectState {
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
            };
        case ProjectActionType.ShowDivisionControl:
            return {
                ...state,
                showDivisionControl: action.payload.showDivisionControl,
            };
        case ProjectActionType.FetchProjectInfo:
            return {
                ...state,
                projectInfo: action.payload.projectInfo
            };
        case ProjectActionType.FetchTicketSystemInfo:
            return {
                ...state,
                ticketSystemConfigInfo: action.payload.ticketSystemConfigInfo,
                showTicketForm: action.payload.showTicketForm
            };
        case ProjectActionType.FetchTicketSystemTypes:
            return {
                ...state,
                ticketingSystemTypes: action.payload.ticketingSystemTypes,
            };
        case ProjectActionType.CurrentTicketSystemType:
            return {
                ...state,
                selectedTicketingSystemType: action.payload.selectedTicketingSystemType,
            };
        case ProjectActionType.EnterpriseAccountState:
            return {
                ...state,
                isEnterpriseAccount: action.payload.isEnterpriseAccount,
            };
        case TicketingSystemInfoActionType.TokenBasedAccountState:
            return {
                ...state,
                isTokenBased: action.payload.isTokenBased,
            };
        case ProjectActionType.FetchCodeAnalysisInfo:
            return {
                ...state,
                codeAnalysisInfo: action.payload.codeAnalysisInfo,
                showForm: action.payload.showForm,
                staticIsTokenBased: action.payload.staticIsTokenBased
            };
        case ProjectActionType.ShowCodeAnalysisDiv:
            return {
                ...state,
                showCodeAnalysisDiv: action.payload.showCodeAnalysisDiv
            };
        case ProjectActionType.FetchAppAnalysisInfo:
            return {
                ...state,
                appAnalysisInfo: action.payload.appAnalysisInfo,
                showDynamicForm: action.payload.showDynamicForm,
                dynamicIsTokenBased: action.payload.isTokenBased
            };
        case ProjectActionType.ShowTab:
            return {
                ...state,
                showTab: action.payload.showTab
            };
        case TicketingSystemInfoActionType.ShowTicketForm:
            return {
                ...state,
                showTicketForm: action.payload.showTicketForm
            };
        case StaticScanInfoActionType.TokenBasedAccountState:
            return {
                ...state,
                staticIsTokenBased: action.payload.staticIsTokenBased,
            };
        case StaticScanInfoActionType.ShowForm:
            return {
                ...state,
                showForm: action.payload.showForm
            };
        case StaticScanInfoActionType.FetchScanTypes:
            return {
                ...state,
                codeScanTypes: action.payload.codeScanTypes
            };
        case StaticScanInfoActionType.FetchSourceCodeTypes:
            return {
                ...state,
                sourceCodeTypes: action.payload.sourceCodeTypes
            };
        case StaticScanInfoActionType.FetchSourceControlTypes:
            return {
                ...state,
                sourceControlTypes: action.payload.sourceControlTypes
            };
        case StaticScanInfoActionType.ShowQualityProfileTab:
            return {
                ...state,
                showQualityProfileTab: action.payload.showQualityProfileTab
            };
        case QualityProfileSectionActionType.ShowPopup:
            return {
                ...state,
                showPopup: action.payload.showPopup
            };
        case QualityProfileSectionActionType.FetchLanguages:
            return {
                ...state,
                languages: action.payload.languages
            };
        case QualityProfileSectionActionType.InitialProfile:
            return {
                ...state,
                selectedProfile: action.payload.initialProfile,
                initialProfile: action.payload.initialProfile
            }
        case QualityProfileSectionActionType.SelectedProfile:
            return {
                ...state,
                selectedProfile: action.payload.selectedProfile
            };
        case QualityProfileSectionActionType.FetchLanguageProfiles:
            return {
                ...state,
                languageProfiles: action.payload.languageProfiles
            };
        case QualityProfileSectionActionType.FetchEntityProfiles:
            return {
                ...state,
                gridResultData: action.payload.gridResultData
            };
        case DynamicScanInfoActionType.ShowDynamicForm:
            return {
                ...state,
                showDynamicForm: action.payload.showDynamicForm
            };
        case DynamicPolicySectionActionType.FetchPolicies:
            return {
                ...state,
                scanPolicies: action.payload.scanPolicies
            };
        case DynamicScanInfoActionType.TokenBasedAccountState:
            return {
                ...state,
                dynamicIsTokenBased: action.payload.dynamicIsTokenBased,
            };
        case ProjectActionType.ShowUserMapTab: {
            return {
                ...state,
                showUserTab: action.payload.showUserTab
            }
        }
        case ProjectActionType.FetchRoleOptions: {
            return {
                ...state,
                roleOptions: action.payload.roleOptions
            }
        }
        case UserMapSectionActionType.FetchEntityUsers: {
            return {
                ...state,
                assignedUsers: action.payload.assignedUsers
            }
        }
        case PermissionActionType.SetPermissionNodes:
            return {
                ...state,
                permissionNodes: action.payload.permissionNodes
            };
        case PermissionActionType.SetSelectedRoles:
            return {
                ...state,
                userRoleInfo: action.payload.userRoleInfo
            };
        case PermissionActionType.FetchPermissionNodes:
            return {
                ...state,
                permissionNodes: action.payload.permissionNodes
            };
        case PermissionActionType.SetSaveDisabledState:
            return {
                ...state,
                isSaveDisabled: action.payload.isSaveDisabled
            };
        case UserMapSectionActionType.ShowPermissionPopup:
            return {
                ...state,
                showPermissionPopup: action.payload.showPermissionPopup
            };
        default:
            return state;
    }
}


