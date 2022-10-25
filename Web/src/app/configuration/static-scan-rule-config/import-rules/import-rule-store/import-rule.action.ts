//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { KeyValuePairModel, Helper, PageState, PagedResult } from '../../../../shared';

import { importRuleService } from '../import-rule.service';
import { RuleFilterRequestModel, ImportRuleFilterFormModel } from '../models'
import { ImportRuleActionType } from './import-rule-action-type.enum';
import { ImportRuleState } from './import-rule.state';
import { RuleModel, RuleActivationRequestModel, ProfileRulePageRequestModel } from '../../models';

//#endregion application imports

export class ImportRuleActionCreator {

    //#region public functions

    /**
     * action to fetch severity types
     * @param errorCallback
     */
    public static fetchSeverityTypes(errorCallback: (error?: any) => void): ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>> {
        return (dispatch: ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>>) => {
            importRuleService.getSeverityTypes(dispatch).then((result: ApiResponseModel<KeyValuePairModel[]>) => {
                if (result && result.isSuccess) {
                    let results = result ? result.data : [];
                    dispatch({
                        type: ImportRuleActionType.FetchSeverityTypes,
                        payload: {
                            severityTypes: results.map(x => Helper.toSelectKeyValueItem(x))
                        }
                    });
                } else {
                    errorCallback(result);
                }
            },
                errorCallback
            );
        }
    }
    /**
    * action to fetch vulnerabilties types
    * @param errorCallback
    */
    public static fetchVulnerabilityTypes(errorCallback: (error?: any) => void): ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>> {
        return (dispatch: ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>>) => {
            importRuleService.getVulnerabilityTypes(dispatch).then((result: ApiResponseModel<KeyValuePairModel[]>) => {
                if (result && result.isSuccess) {
                    let results = result ? result.data : [];
                    dispatch({
                        type: ImportRuleActionType.FetchVulnerabilityTypes,
                        payload: {
                            vulnerabilityTypes: results.map(x => Helper.toSelectKeyValueItem(x))
                        }
                    });
                } else {
                    errorCallback(result);
                }
            },
                errorCallback
            );
        }
    }

    /**
    * action to fetch rules
    * @param request
    * @param profileRules
    * @param errorCallback
    */
    public static fetchRules(request: RuleFilterRequestModel, profileRules: RuleModel[], errorCallback: (error?: any) => void): ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>> {
        return (dispatch: ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>>) => {
            importRuleService.getRules(request, dispatch).then((response: ApiResponseModel<PagedResult<RuleModel>>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: ImportRuleActionType.FetchRules,
                        payload: {
                            rules: response.data,
                            total: response.data.total,
                            formlist: response.data.items.map((x, i) => {
                                x.isActive = profileRules.findIndex(p => p.key === x.key) > -1;
                                return Helper.toGridRowModel(x, i)
                            })
                        }
                    });
                }
                else {
                    errorCallback(response);
                }
            },
                errorCallback
            );
        };
    }

    /**
     * action to save profile info to store
     * @param profileSaveRequest
     * @param successCallback
     * @param errorCallback
     */
    public static changeRuleActivation(profileSaveRequest: RuleActivationRequestModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<PageState, any, IAppActionModel<PageState>> {
        return (dispatch: ThunkDispatch<PageState, any, IAppActionModel<PageState>>) => {
            importRuleService.changeRuleActivation(profileSaveRequest, dispatch).then(successCallback, errorCallback);
        };
    }

    /**
     * action to set selected language state info to store
     * @param selectedlanguage
     */
    public static setLanguage(selectedlanguage: string): ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>> {
        return (dispatch: ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>>) => {
            dispatch({
                type: ImportRuleActionType.SetSelectedLanguage,
                payload: { selectedLanguage: selectedlanguage }
            });
        };
    }

    /**
     * action to set selected filter form values state info to store
     * @param formData
     */
    public static setFilterFormData(formData: ImportRuleFilterFormModel): ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>> {
        return (dispatch: ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>>) => {
            dispatch({
                type: ImportRuleActionType.SetFilterFormData,
                payload: {
                    filterFormData: {
                        severities: formData.severities,
                        sonarSourceSecurities: formData.sonarSourceSecurities,
                        language: formData.language
                    }
                }
            });
        };
    }

    /**
     * action to fetch profile based rules
     * @param profileRuleRequest
     * @param ruleRequest
     * @param errorCallback
     */
    public static fetchProfileBasedRules(profileRuleRequest: ProfileRulePageRequestModel, ruleRequest: RuleFilterRequestModel, errorCallback: (error?: any) => void): ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>> {
        return (dispatch: ThunkDispatch<ImportRuleState, any, IAppActionModel<ImportRuleState>>) => {
            importRuleService.getProfileRules(profileRuleRequest, dispatch).then((response: ApiResponseModel<PagedResult<RuleModel>>) => {
                if (response && response.isSuccess) {
                    dispatch({
                        type: ImportRuleActionType.FetchProfileBasedRules,
                        payload: { profileBasedRules: response.data }
                    });
                    dispatch(ImportRuleActionCreator.fetchRules(ruleRequest, response.data.items, errorCallback));
                }
                else {
                    errorCallback(response);
                }
            },
                errorCallback
            );
        };
    }

    //#endregion public functions
}
