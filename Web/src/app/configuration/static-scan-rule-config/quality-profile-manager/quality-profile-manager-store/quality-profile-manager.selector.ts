//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { PagedResult } from '../../../../shared';

import { QualityProfileManagerState } from './quality-profile-manager.state';
import { LanguageProfileMapModel } from '../../models';

//#endregion application imports


class QualityProfileManagerSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets scan rules from state
     * @param state
     */
    public getQualityProfiles(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticProfileManagerReducer] ?
                (state[Constant.reducerKey.staticProfileManagerReducer] as QualityProfileManagerState).qualityProfiles : new PagedResult<LanguageProfileMapModel>(),
            (staticScanRules) => staticScanRules
        );
        return selector(state);
    }

    //#endregion public functions
}

export const qualityProfileManagerSelector = new QualityProfileManagerSelector();

