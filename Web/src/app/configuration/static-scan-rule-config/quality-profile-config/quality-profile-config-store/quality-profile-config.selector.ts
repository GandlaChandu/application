//#region react imports

import { createSelector } from 'reselect';

//#endregion react imports

//#region application imports

import { Constant } from '../../../../utilities';
import { PagedResult } from '../../../../shared';

import { QualityProfileConfigState } from './quality-profile-config.state';
import { RuleModel } from '../../models';

//#endregion application imports


class QualityProfileConfigSelector {

    //#region model properties
    //#endregion model properties

    //#region public functions

    /**
     * gets Languages
     * @param state
     */
    public getLanguageTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticProfileConfigReducer] ?
                (state[Constant.reducerKey.staticProfileConfigReducer] as QualityProfileConfigState).languageTypes : [],
            (languageTypes) => languageTypes
        );
        return selector(state);
    }

    /**
     * gets severity
     * @param state
     */
    public getSeverityTypes(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticProfileConfigReducer] ?
                (state[Constant.reducerKey.staticProfileConfigReducer] as QualityProfileConfigState).severity : [],
            (languageTypes) => languageTypes
        );
        return selector(state);
    }

    /**
     * gets quality profile info
     * @param state
     */
    public getQualityProfileInfo(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticProfileConfigReducer] ?
                (state[Constant.reducerKey.staticProfileConfigReducer] as QualityProfileConfigState).qualityProfileInfo : null,
            (qualityProfileInfo) => qualityProfileInfo
        );
        return selector(state);
    }
    
    /**
     * gets selected language
     * @param state
     */
    public getSelectedLanguage(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticProfileConfigReducer] ?
                (state[Constant.reducerKey.staticProfileConfigReducer] as QualityProfileConfigState).selectedLanguage : null,
            (selectedLanguage) => selectedLanguage
        );
        return selector(state);
    }

    /**
     * gets profile related language
     * @param state
     */
    public getProfileLanguage(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticProfileConfigReducer] ?
                (state[Constant.reducerKey.staticProfileConfigReducer] as QualityProfileConfigState).profileLanguage : null,
            (profileLanguage) => profileLanguage
        );
        return selector(state);
    }

    /**
     * gets profile based rules from state
     * @param state
     */
    public getQualityProfileRules(state: any) {
        let selector = createSelector(
            (state: any) => state[Constant.reducerKey.staticProfileConfigReducer] ?
                (state[Constant.reducerKey.staticProfileConfigReducer] as QualityProfileConfigState).importProfileBasedRules : new PagedResult<RuleModel>(),
            (importProfileBasedRules) => importProfileBasedRules
        );
        return selector(state);
    }

    //#endregion public functions

}

export const qualityProfileConfigSelector = new QualityProfileConfigSelector();

