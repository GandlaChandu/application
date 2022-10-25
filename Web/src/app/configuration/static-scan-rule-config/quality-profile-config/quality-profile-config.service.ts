//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url } from '../../../utilities';
import { apiHandler, IAppActionModel } from '../../../core';
import { Helper } from '../../../shared';

import { QualityProfileConfigState } from './quality-profile-config-store';
import { ProfileRulePageRequestModel } from '../models/profile-rule-page-request.model';
import { LanguageProfileMapModel, RuleActivationRequestModel } from '../models';

//#endregion application imports

class QualityProfileConfigService {

    //#region public functions

    /**
    * get language types
    * @param dispatch
    */
    public getLanguageTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getStaticScanUrl(Url.apiUrl.fetchLanguageTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets severity types
     * @param dispatch
     */
    public getSeverityTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getStaticScanUrl(Url.apiUrl.fetchSeverityTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets vulnerebility types
     * @param dispatch
     */
    public getVulnerabilityTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getStaticScanUrl(Url.apiUrl.fetchVulnerebilityTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * get Quality profile by id
     * @param qualityProfileId
     * @param dispatch
     */
    public getQualityProfile(qualityProfileId: number, dispatch: ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>>) {
        let url = Url.getStaticScanUrl(`${Url.apiUrl.getQualityProfile}/${qualityProfileId}`);
        return apiHandler.get(url, dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * save profile
    * @param dispatch
    */
    public saveProfile(data: LanguageProfileMapModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.saveProfileApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * udate profile
    * @param dispatch
    */
    public updateProfile(data: LanguageProfileMapModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.put(Url.getStaticScanUrl(Url.apiUrl.updateProfileApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * gets profile based rules list
    * @param dispatch
    */
    public getProfileRules(pageRequestModel: ProfileRulePageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.profileBasedRulesListApi), pageRequestModel, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * saves change rules activation to api
     * @param data
     * @param dispatch
     */
    public changeRuleActivation(data: RuleActivationRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.saveRuleActivationApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const qualityProfileConfigService = new QualityProfileConfigService();