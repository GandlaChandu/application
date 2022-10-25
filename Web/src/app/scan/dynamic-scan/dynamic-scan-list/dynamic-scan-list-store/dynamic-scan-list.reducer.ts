//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { DynamicScanListState } from './dynamic-scan-list.state';
import { DynamicScanListActionType } from './dynamic-scan-list-action-type.enum';

//#endregion application imports

const initialDynamicScanListState: DynamicScanListState = new DynamicScanListState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function dynamicScanListReducer(state: DynamicScanListState = initialDynamicScanListState, action: IAppActionModel<DynamicScanListState>): DynamicScanListState {
    switch (action.type) {
        case DynamicScanListActionType.FetchDynamicResults:
            return {
                ...state,
                dynamicScans: action.payload.dynamicScans
            };
        default:
            return state;
    }
}


