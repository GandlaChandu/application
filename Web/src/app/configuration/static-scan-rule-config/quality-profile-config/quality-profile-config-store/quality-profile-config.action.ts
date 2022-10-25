//#region react imports

import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { IAppActionModel, ApiResponseModel } from '../../../../core';
import { KeyNamePairModel, Helper, PagedResult, PageState } from '../../../../shared';

import { RuleModel, LanguageProfileMapModel, ProfileRulePageRequestModel, RuleActivationRequestModel } from '../../models';
import { QualityProfileConfigState } from './quality-profile-config.state';
import { QualityProfileConfigActionType } from './quality-profile-config-action-type.enum';
import { qualityProfileConfigService } from '../quality-profile-config.service';

//#endregion application imports

export class QualityProfileConfigActionCreator {

    //#region public functions

    /**
     * action to set language types and save info to store
     * @param id
     * @param errorCallback
     */
    public static fetchLanguageTypes(errorCallback: (error?: any) => void): ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>> {
        return (dispatch: ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>>) => {
            qualityProfileConfigService.getLanguageTypes(dispatch).then((result: ApiResponseModel<KeyNamePairModel[]>) => {
                if (result && result.isSuccess) {
                    let results = result ? result.data : [];
                    dispatch({
                        type: QualityProfileConfigActionType.FetchLanguageTypes,
                        payload: {
                            languageTypes: results.map(x => Helper.toSelectListItem(x))
                        }
                    });
                }
                else {
                    errorCallback(result);
                }
            },
                errorCallback
            );
        }
    }

    /**
     * action to set severity types and save info to store
     * @param id
     * @param errorCallback
     */
    public static fetchSeverityTypes(errorCallback: (error?: any) => void): ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>> {
        return (dispatch: ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>>) => {
            qualityProfileConfigService.getLanguageTypes(dispatch).then((result: ApiResponseModel<KeyNamePairModel[]>) => {
                if (result && result.isSuccess) {
                    let results = result ? result.data : [];
                    dispatch({
                        type: QualityProfileConfigActionType.FetchLanguageTypes,
                        payload: {
                            languageTypes: results.map(x => Helper.toSelectListItem(x))
                        }
                    });
                }
                else {
                    errorCallback(result);
                }
            },
                errorCallback
            );
        }
    }

    /**
     * action to set Quality profile details to store
     * @param profileInfo
     */
    public static setQualityProfileDetail(profileInfo: LanguageProfileMapModel): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>>) => {
            dispatch({
                type: QualityProfileConfigActionType.SetQualityProfileInfo,
                payload: {
                    qualityProfileInfo: profileInfo
                }
            });
        };
    }

    /**
     * action to set profile related state info to store
     * @param profileLanguage
     */
    public static setProfileLanguage(profileLanguage: number): ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>> {
        return (dispatch: ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>>) => {
            dispatch({
                type: QualityProfileConfigActionType.FetchProfileLanguage,
                payload: { profileLanguage: profileLanguage }
            });
        };
    }

    /**
     * action to save profile info to store
     * @param profileSaveRequest
     * @param successCallback
     * @param errorCallback
     */
    public static saveProfileInfo(profileSaveRequest: LanguageProfileMapModel, successCallback: (response) => void, errorCallback: (response) => void): ThunkDispatch<any, any, IAppActionModel<any>> {
        return (dispatch: ThunkDispatch<any, any, IAppActionModel<any>>) => {
            if (profileSaveRequest.id > 0) {
                qualityProfileConfigService.updateProfile(profileSaveRequest, dispatch).then(successCallback, errorCallback);
            }
            else {
                qualityProfileConfigService.saveProfile(profileSaveRequest, dispatch).then(successCallback, errorCallback);
            }

        };
    }

    /**
     * action to fetch profile based rules
     * @param request
     * @param errorCallback
     */
    public static fetchProfileBasedRules(request: ProfileRulePageRequestModel, errorCallback: (error?: any) => void): ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>> {
        return (dispatch: ThunkDispatch<QualityProfileConfigState, any, IAppActionModel<QualityProfileConfigState>>) => {
            if (request && request.qualityProfileId && request.qualityProfileId > 0) {
                qualityProfileConfigService.getProfileRules(request, dispatch).then((response: ApiResponseModel<PagedResult<RuleModel>>) => {
                    if (response && response.isSuccess) {
                        dispatch({
                            type: QualityProfileConfigActionType.FetchProfileBasedRules,
                            payload: { importProfileBasedRules: response.data }
                        });
                    }
                    else {
                        errorCallback(response);
                    }
                },
                    errorCallback
                );
            }
            else {
                dispatch({
                    type: QualityProfileConfigActionType.FetchProfileBasedRules,
                    payload: { importProfileBasedRules: new PagedResult<RuleModel>() }
                });
            }
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
            qualityProfileConfigService.changeRuleActivation(profileSaveRequest, dispatch).then(successCallback, errorCallback);
        };
    }

    //#endregion public functions
}