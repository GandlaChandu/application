//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { PagedResult, DivisionModel } from '../../../../../shared';
import { Constant } from '../../../../../utilities';

import { DivisionSectionState } from './division.state';

//#endregion application imports


class DivisionSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions
    
    /**
     * gets division tab display state for client
     * @param state
     */
    public getDivisionTabState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.clientReducer] ?
                (state[Constant.reducerKey.clientReducer] as DivisionSectionState).showDivisionTab : false,
            (showDivisionTab) => showDivisionTab
        );
        return selector(state);
    }

    /**
     * gets divisions for client
     * @param state
     */
    public getDivisions(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.clientReducer] ?
                (state[Constant.reducerKey.clientReducer] as DivisionSectionState).divisions : new PagedResult<DivisionModel>(),
            (gridResultData) => gridResultData
        );
        return selector(state);
    }

    /**
     * gets selected division for client
     * @param state
     */
    public getSelectedDivision(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.clientReducer] ?
                (state[Constant.reducerKey.clientReducer] as DivisionSectionState).selectedDivision : undefined,
            (division) => division
        );
        return selector(state);
    }

    /**
     * gets popup state for client
     * @param state
     */
    public getPopupState(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.clientReducer] ?
                (state[Constant.reducerKey.clientReducer] as DivisionSectionState).showDivisionPopup : false,
            (showDivisionPopup) => showDivisionPopup
        );
        return selector(state);
    }

    //#endregion public functions

}

export const divisionSelector = new DivisionSelector();

