//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { QualityProfileConfigState } from './quality-profile-config.state';
import { QualityProfileConfigActionType } from './quality-profile-config-action-type.enum';

//#endregion application imports

const initialQualityProfileConfigState: QualityProfileConfigState = new QualityProfileConfigState();

/**
 * static scan rule actions reducer
 * @param state
 * @param action
 */
export function qualityProfileConfigReducer(state: QualityProfileConfigState = initialQualityProfileConfigState, action: IAppActionModel<QualityProfileConfigState>): QualityProfileConfigState {

    switch (action.type) {
        case QualityProfileConfigActionType.FetchLanguageTypes:
            return {
                ...state,
                languageTypes: action.payload.languageTypes
            };
        case QualityProfileConfigActionType.SetQualityProfileInfo:
            return {
                ...state,
                qualityProfileInfo: action.payload.qualityProfileInfo,
            };
        case QualityProfileConfigActionType.FetchSelectedLanguage:
            return {
                ...state,
                selectedLanguage: action.payload.selectedLanguage,
            };
        case QualityProfileConfigActionType.FetchProfileLanguage:
            return {
                ...state,
                profileLanguage: action.payload.profileLanguage,
            };
        case QualityProfileConfigActionType.FetchProfileBasedRules:
            return {
                ...state,
                importProfileBasedRules: action.payload.importProfileBasedRules
            };
        default:
            return state;
    }
}


