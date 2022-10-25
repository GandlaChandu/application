//#region react imports

//#endregion react imports

//#region application imports

import { IAppActionModel } from '../../../../core';

import { StaticScanListState } from './static-scan-list.state';
import { StaticScanListActionType } from './static-scan-list-action-type.enum';

//#endregion application imports

const initialStaticScanListState: StaticScanListState = new StaticScanListState();

/**
 * loader actions reducer
 * @param state
 * @param action
 */
export function staticScanListReducer(state: StaticScanListState = initialStaticScanListState, action: IAppActionModel<StaticScanListState>): StaticScanListState {
    switch (action.type) {
        case StaticScanListActionType.FetchStaticResults:
            return {
                ...state,
                gridResultData: action.payload.gridResultData
            };
        default:
            return state;
    }
}


