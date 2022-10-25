//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { ClientState } from './client.state';
import { ClientActionType } from './client-action-type.enum';
import { DynamicPolicySectionActionType, QualityProfileSectionActionType, UserMapSectionActionType } from '../../../config-shared';
import { DivisionSectionActionType } from '../division-section/division-store';

//#endregion application imports

const initialClientState: ClientState = new ClientState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function clientReducer(state: ClientState = initialClientState, action: IAppActionModel<ClientState>): ClientState {
    switch (action.type) {

        case ClientActionType.SetClient:
            return {
                ...state,
                client: action.payload.client
            }

        case ClientActionType.ShowDivisionTab: {
            return {
                ...state,
                showDivisionTab: action.payload.showDivisionTab,
                showQualityProfileTab: action.payload.showQualityProfileTab,
                showUserTab: action.payload.showUserTab
            }
        }
        case ClientActionType.ShowQualityProfileTab: {
            return {
                ...state,
                showDivisionTab: action.payload.showDivisionTab,
                showQualityProfileTab: action.payload.showQualityProfileTab,
                showUserTab: action.payload.showUserTab
            }
        }

        case DivisionSectionActionType.FetchDivisions:
            return {
                ...state,
                divisions: action.payload.divisions
            };
        case DivisionSectionActionType.SetDivisionPopup:
            return {
                ...state,
                showDivisionPopup: action.payload.showDivisionPopup,
                selectedDivision: action.payload.selectedDivision
            }
        case DynamicPolicySectionActionType.FetchPolicies:
            return {
                ...state,
                scanPolicies: action.payload.scanPolicies
            }
        case QualityProfileSectionActionType.ShowPopup:
            return {
                ...state,
                showPopup: action.payload.showPopup
            }
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
            }
        case QualityProfileSectionActionType.FetchLanguages:
            return {
                ...state,
                languages: action.payload.languages
            }
        case QualityProfileSectionActionType.FetchLanguageProfiles:
            return {
                ...state,
                languageProfiles: action.payload.languageProfiles
            }
        case QualityProfileSectionActionType.FetchEntityProfiles:
            return {
                ...state,
                gridResultData: action.payload.gridResultData
            }
        case ClientActionType.ShowUserMapTab: {
            return {
                ...state,
                showDivisionTab: action.payload.showDivisionTab,
                showQualityProfileTab: action.payload.showQualityProfileTab,
                showUserTab: action.payload.showUserTab
            }
        }
        case UserMapSectionActionType.FetchEntityUsers: {
            return {
                ...state,
                assignedUsers: action.payload.assignedUsers
            }
        }
        default:
            return state;
    }
}


