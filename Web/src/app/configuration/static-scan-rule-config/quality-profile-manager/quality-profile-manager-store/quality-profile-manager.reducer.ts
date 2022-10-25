//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { QualityProfileManagerState } from './quality-profile-manager.state';
import { QualityProfileManagerActionType } from './quality-profile-manager-action-type.enum';

//#endregion application imports

const initialQualityProfileManagerState: QualityProfileManagerState = new QualityProfileManagerState();

/**
 * static scan rule config actions reducer
 * @param state
 * @param action
 */
export function qualityProfileManagerReducer(state: QualityProfileManagerState = initialQualityProfileManagerState, action: IAppActionModel<QualityProfileManagerState>): QualityProfileManagerState {
    switch (action.type) {
        case QualityProfileManagerActionType.FetchStaticScanRules:
            return {
                ...state,
                qualityProfiles: action.payload.qualityProfiles
            };
        default:
            return state;
    }
}


