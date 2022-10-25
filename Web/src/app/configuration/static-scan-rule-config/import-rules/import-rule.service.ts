//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { Url } from '../../../utilities';
import { apiHandler, IAppActionModel } from '../../../core';
import { Helper } from '../../../shared';

import { RuleFilterRequestModel } from './models';
import { RuleActivationRequestModel, ProfileRulePageRequestModel } from '../models';

//#endregion application imports

class ImportRuleService {

    //#region public functions

    /**
     * get severity types
     * @param dispatch
     */
    public getSeverityTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getStaticScanUrl(Url.apiUrl.fetchSeverityTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     *  get vulnerebility types
     * @param dispatch
     */
    public getVulnerabilityTypes(dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.get(Url.getStaticScanUrl(Url.apiUrl.fetchVulnerebilityTypesApi), dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * gets rules list
     * @param dispatch
     */
    public getRules(pageRequestModel: RuleFilterRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.rulesListApi), pageRequestModel, dispatch, Helper.setHeaderAuthToken());
    }

    /**
     * saves change rules activation to api
     * @param data
     * @param dispatch
     */
    public changeRuleActivation(data: RuleActivationRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.saveRuleActivationApi), data, dispatch, Helper.setHeaderAuthToken());
    }

    /**
    * gets profile based rules list
    * @param dispatch
    */
    public getProfileRules(pageRequestModel: ProfileRulePageRequestModel, dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) {
        return apiHandler.post(Url.getStaticScanUrl(Url.apiUrl.profileBasedRulesListApi), pageRequestModel, dispatch, Helper.setHeaderAuthToken());
    }

    //#endregion public functions

}

export const importRuleService = new ImportRuleService();